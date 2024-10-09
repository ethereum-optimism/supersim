"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateUserOperationGas = estimateUserOperationGas;
const parseAccount_js_1 = require("../../../accounts/utils/parseAccount.js");
const account_js_1 = require("../../../errors/account.js");
const getAction_js_1 = require("../../../utils/getAction.js");
const getUserOperationError_js_1 = require("../../utils/errors/getUserOperationError.js");
const userOperationGas_js_1 = require("../../utils/formatters/userOperationGas.js");
const userOperationRequest_js_1 = require("../../utils/formatters/userOperationRequest.js");
const prepareUserOperation_js_1 = require("./prepareUserOperation.js");
async function estimateUserOperationGas(client, parameters) {
    const { account: account_ = client.account, entryPointAddress } = parameters;
    if (!account_ && !parameters.sender)
        throw new account_js_1.AccountNotFoundError();
    const account = account_ ? (0, parseAccount_js_1.parseAccount)(account_) : undefined;
    const request = account
        ? await (0, getAction_js_1.getAction)(client, prepareUserOperation_js_1.prepareUserOperation, 'prepareUserOperation')({
            ...parameters,
            parameters: ['factory', 'nonce', 'paymaster', 'signature'],
        })
        : parameters;
    try {
        const result = await client.request({
            method: 'eth_estimateUserOperationGas',
            params: [
                (0, userOperationRequest_js_1.formatUserOperationRequest)(request),
                (entryPointAddress ?? account?.entryPoint?.address),
            ],
        });
        return (0, userOperationGas_js_1.formatUserOperationGas)(result);
    }
    catch (error) {
        const calls = parameters.calls;
        throw (0, getUserOperationError_js_1.getUserOperationError)(error, {
            ...request,
            ...(calls ? { calls } : {}),
        });
    }
}
//# sourceMappingURL=estimateUserOperationGas.js.map