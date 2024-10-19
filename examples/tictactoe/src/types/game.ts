import { MessageIdentifier } from "@eth-optimism/viem";

export enum PlayerTurn {
    Player = 0,
    Opponent = 1
}

export enum GameStatus {
    Active = 0,
    Draw = 1,
    Won = 2,
    Lost = 3,
}

export interface Game {
    chainId: number;
    gameId: number;

    player: string;

    // Opponent is not defined until accepted
    opponent?: string;
    opponentChainId?: number;

    moves: number[][];
    turn: PlayerTurn

    status: GameStatus;

    // Last event log action
    lastActionId: MessageIdentifier
    lastActionData: string
}

export type GameKey = `${number}-${number}-${string}`;

export const createGameKey = (chainId: number, gameId: number, player: string): GameKey =>{
    return `${chainId}-${gameId}-${player.toLowerCase()}`
}