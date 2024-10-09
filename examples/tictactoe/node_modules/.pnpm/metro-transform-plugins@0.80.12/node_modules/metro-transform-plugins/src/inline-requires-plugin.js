"use strict";

module.exports = ({ types: t, traverse }) => ({
  name: "inline-requires",
  visitor: {
    Program: {
      enter() {},
      exit(path, state) {
        const ignoredRequires = new Set();
        const inlineableCalls = new Set(["require"]);
        const opts = state.opts;
        if (opts != null) {
          if (opts.ignoredRequires != null) {
            for (const name of opts.ignoredRequires) {
              ignoredRequires.add(name);
            }
          }
          if (opts.inlineableCalls != null) {
            for (const name of opts.inlineableCalls) {
              inlineableCalls.add(name);
            }
          }
        }
        path.scope.crawl();
        path.traverse(
          {
            CallExpression(path, state) {
              const parseResult =
                parseInlineableAlias(path, state) ||
                parseInlineableMemberAlias(path, state);
              if (parseResult == null) {
                return;
              }
              const { declarationPath, moduleName, requireFnName } =
                parseResult;
              const init = declarationPath.node.init;
              const name = declarationPath.node.id
                ? declarationPath.node.id.name
                : null;
              const binding =
                name == null ? null : declarationPath.scope.getBinding(name);
              if (binding == null || binding.constantViolations.length > 0) {
                return;
              }
              const initPath = declarationPath.get("init");
              if (init == null || Array.isArray(initPath)) {
                return;
              }
              const initLoc = getNearestLocFromPath(initPath);
              deleteLocation(init);
              traverse(init, {
                noScope: true,
                enter: (path) => deleteLocation(path.node),
              });
              let thrown = false;
              for (const referencePath of binding.referencePaths) {
                excludeMemberAssignment(moduleName, referencePath, state);
                try {
                  referencePath.scope.rename(requireFnName);
                  const refExpr = t.cloneDeep(init);
                  refExpr.METRO_INLINE_REQUIRES_INIT_LOC = initLoc;
                  referencePath.replaceWith(refExpr);
                } catch (error) {
                  thrown = true;
                }
              }
              if (!thrown) {
                declarationPath.remove();
              }
            },
          },
          {
            ignoredRequires,
            inlineableCalls,
            membersAssigned: new Map(),
          }
        );
      },
    },
  },
});
function excludeMemberAssignment(moduleName, referencePath, state) {
  const assignment = referencePath.parentPath?.parent;
  if (assignment?.type !== "AssignmentExpression") {
    return;
  }
  const left = assignment.left;
  if (left.type !== "MemberExpression" || left.object !== referencePath.node) {
    return;
  }
  const memberPropertyName = getMemberPropertyName(left);
  if (memberPropertyName == null) {
    return;
  }
  let membersAssigned = state.membersAssigned.get(moduleName);
  if (membersAssigned == null) {
    membersAssigned = new Set();
    state.membersAssigned.set(moduleName, membersAssigned);
  }
  membersAssigned.add(memberPropertyName);
}
function isExcludedMemberAssignment(moduleName, memberPropertyName, state) {
  const excludedAliases = state.membersAssigned.get(moduleName);
  return excludedAliases != null && excludedAliases.has(memberPropertyName);
}
function getMemberPropertyName(node) {
  if (node.property.type === "Identifier") {
    return node.property.name;
  }
  if (node.property.type === "StringLiteral") {
    return node.property.value;
  }
  return null;
}
function deleteLocation(node) {
  delete node.start;
  delete node.end;
  delete node.loc;
}
function parseInlineableAlias(path, state) {
  const module = getInlineableModule(path, state);
  if (module == null) {
    return null;
  }
  const { moduleName, requireFnName } = module;
  const parentPath = path.parentPath;
  if (parentPath == null) {
    return null;
  }
  const grandParentPath = parentPath.parentPath;
  if (grandParentPath == null) {
    return null;
  }
  const isValid =
    path.parent.type === "VariableDeclarator" &&
    path.parent.id.type === "Identifier" &&
    parentPath.parent.type === "VariableDeclaration" &&
    grandParentPath.parent.type === "Program";
  return !isValid || parentPath.node == null
    ? null
    : {
        declarationPath: parentPath,
        moduleName,
        requireFnName,
      };
}
function parseInlineableMemberAlias(path, state) {
  const module = getInlineableModule(path, state);
  if (module == null) {
    return null;
  }
  const { moduleName, requireFnName } = module;
  const parent = path.parent;
  const parentPath = path.parentPath;
  if (parentPath == null) {
    return null;
  }
  const grandParentPath = parentPath.parentPath;
  if (grandParentPath == null) {
    return null;
  }
  if (parent.type !== "MemberExpression") {
    return null;
  }
  const memberExpression = parent;
  if (parentPath.parent.type !== "VariableDeclarator") {
    return null;
  }
  const variableDeclarator = parentPath.parent;
  if (variableDeclarator.id.type !== "Identifier") {
    return null;
  }
  if (
    grandParentPath.parent.type !== "VariableDeclaration" ||
    grandParentPath.parentPath?.parent.type !== "Program" ||
    grandParentPath.node == null
  ) {
    return null;
  }
  const memberPropertyName = getMemberPropertyName(memberExpression);
  return memberPropertyName == null ||
    isExcludedMemberAssignment(moduleName, memberPropertyName, state)
    ? null
    : {
        declarationPath: grandParentPath,
        moduleName,
        requireFnName,
      };
}
function getInlineableModule(path, state) {
  const node = path.node;
  const isInlineable =
    node.type === "CallExpression" &&
    node.callee.type === "Identifier" &&
    state.inlineableCalls.has(node.callee.name) &&
    node["arguments"].length >= 1;
  if (!isInlineable) {
    return null;
  }
  let moduleName =
    node["arguments"][0].type === "StringLiteral"
      ? node["arguments"][0].value
      : null;
  if (moduleName == null) {
    const callNode = node["arguments"][0];
    if (
      callNode.type === "CallExpression" &&
      callNode.callee.type === "MemberExpression" &&
      callNode.callee.object.type === "Identifier"
    ) {
      const callee = callNode.callee;
      moduleName =
        callee.object.type === "Identifier" &&
        state.inlineableCalls.has(callee.object.name) &&
        callee.property.type === "Identifier" &&
        callee.property.name === "resolve" &&
        callNode["arguments"].length >= 1 &&
        callNode["arguments"][0].type === "StringLiteral"
          ? callNode["arguments"][0].value
          : null;
    }
  }
  const fnName = node.callee.name;
  if (fnName == null) {
    return null;
  }
  const isRequireInScope = path.scope.getBinding(fnName) != null;
  return moduleName == null ||
    state.ignoredRequires.has(moduleName) ||
    moduleName.startsWith("@babel/runtime/") ||
    isRequireInScope
    ? null
    : {
        moduleName,
        requireFnName: fnName,
      };
}
function getNearestLocFromPath(path) {
  let current = path;
  while (current && !current.node.loc) {
    current = current.parentPath;
  }
  return current?.node.loc;
}
