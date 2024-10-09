import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

interface QueryErrorResetBoundaryValue {
    clearReset: () => void;
    isReset: () => boolean;
    reset: () => void;
}
declare const useQueryErrorResetBoundary: () => QueryErrorResetBoundaryValue;
interface QueryErrorResetBoundaryProps {
    children: ((value: QueryErrorResetBoundaryValue) => React.ReactNode) | React.ReactNode;
}
declare const QueryErrorResetBoundary: ({ children, }: QueryErrorResetBoundaryProps) => react_jsx_runtime.JSX.Element;

export { QueryErrorResetBoundary, type QueryErrorResetBoundaryProps, type QueryErrorResetBoundaryValue, useQueryErrorResetBoundary };
