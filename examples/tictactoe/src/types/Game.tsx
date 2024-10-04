import { MessageIdentifier } from "@eth-optimism/viem";

export enum PlayerTurn {
    Player = 0,
    Opponent = 1
}

export interface Game {
    chainId: number;
    gameId: number;

    // Opponent is not defined until accepted
    player: string;
    opponent: string | undefined;

    moves: number[][];
    turn: PlayerTurn

    gameWon: boolean;
    gameDrawn: boolean;

    // Last event log action
    lastActionId: MessageIdentifier
    lastActionData: string
}

export type GameKey = `${number}-${number}-${string}`;

export const createGameKey = (chainId: number, gameId: number, player: string): GameKey =>{
    return `${chainId}-${gameId}-${player.toLowerCase()}`
}