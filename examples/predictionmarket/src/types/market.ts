import { Address } from 'viem';

export enum MarketType {
    MOCK = 0,
    BLOCKHASH = 1,
    TICTACTOE = 2,
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
    resolver: Address
    type: MarketType

    status: MarketStatus
    outcome: MarketOutcome

    // tokens
    yesToken: Address,
    noToken: Address,
    lpToken: Address,

    // balances
    ethBalance: BigInt
    yesBalance: BigInt
    noBalance: BigInt
}