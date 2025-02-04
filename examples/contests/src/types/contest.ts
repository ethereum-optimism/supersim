import { Address } from 'viem';

export enum ContestType {
    MOCK = 0,
    BLOCKHASH = 1,
    TICTACTOE = 2,
}

export enum ContestOutcome {
    UNDECIDED = 0,
    YES = 1,
    NO = 2,
}

export enum ContestStatus {
    OPEN = 0,
    CLOSED = 1
}

export interface Contest {
    resolver: Address
    type: ContestType

    outcome: ContestOutcome

    // tokens
    yesToken: Address,
    noToken: Address,
    lpToken: Address,

    // balances
    ethBalance: bigint
    yesBalance: bigint
    noBalance: bigint
}