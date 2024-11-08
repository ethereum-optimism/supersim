import { Address } from 'viem';

export enum MarketType {
    L1BLOCK = 0,
    TICTACTOE = 1,
}

export enum MarketOutcome {
    UNDECIDED = 0,
    YES = 1,
    NO = 2,
}

export enum MarketStatus {
    OPEN = 0,
    CLOSED = 1
}

export interface Market {
    status: MarketStatus
    outtcome: MarketOutcome

    yesToken: Address,
    noToken: Address,
    lpToken: Address,

    ethBalance: number
}