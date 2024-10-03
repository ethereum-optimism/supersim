export interface Game {
    chainId: number;
    gameId: number;

    // Opponent is not defined until accepted
    player: string;
    opponent: string | undefined;

    moves: number[][];

    gameWon: boolean;
    gameDrawn: boolean;
}

export type GameKey = `${number}-${number}-${string}`;

export const createGameKey = (chainId: number, gameId: number, player: string): GameKey =>{
    return `${chainId}-${gameId}-${player.toLowerCase()}`
}