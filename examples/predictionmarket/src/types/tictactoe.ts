import { Address, Hex } from "viem"
import { MessageIdentifier } from "@eth-optimism/viem"

export type ResolvedGame = {
    key: GameKey,

    id: MessageIdentifier,
    payload: Hex
}

export type AcceptedGame = {
    key: GameKey,

    player: Address,
    opponent: Address,

    id: MessageIdentifier,
    payload: Hex
}

export type GameKey = `${number}-${number}`;

export const createGameKey = (chainId: number, gameId: number): GameKey => {
    return `${chainId}-${gameId}`
}