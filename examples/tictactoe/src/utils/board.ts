
const MAGIC_SQUARE: number[][] = [[8, 3, 4], [1, 5, 9], [6, 7, 2]];

const WINNING_SUM = 15;
const LOSING_SUM = 30;

export const endingMoves = (moves: number[][]): number[][] | undefined => {
    for (let i = 0; i < 3; i++) {
        // Check if the sum of the row is 15
        const sum = (moves[i][0] * MAGIC_SQUARE[i][0]) + (moves[i][1] * MAGIC_SQUARE[i][1]) + (moves[i][2] * MAGIC_SQUARE[i][2])
        if (sum === WINNING_SUM || sum === LOSING_SUM) {
            return [[i, 0], [i, 1], [i, 2]]
        }

        const colSum = (moves[0][i] * MAGIC_SQUARE[0][i]) + (moves[1][i] * MAGIC_SQUARE[1][i]) + (moves[2][i] * MAGIC_SQUARE[2][i])
        if (colSum === WINNING_SUM || colSum === LOSING_SUM) {
            return [[0, i], [1, i], [2, i]]
        }
    }

    const leftToRightDiagSum = (moves[0][0] * MAGIC_SQUARE[0][0]) + (moves[1][1] * MAGIC_SQUARE[1][1]) + (moves[2][2] * MAGIC_SQUARE[2][2])
    if (leftToRightDiagSum === WINNING_SUM || leftToRightDiagSum === LOSING_SUM) {
        return [[0, 0], [1, 1], [2, 2]]
    }

    const rightToLeftDiagSum = (moves[0][2] * MAGIC_SQUARE[0][2]) + (moves[1][1] * MAGIC_SQUARE[1][1]) + (moves[2][0] * MAGIC_SQUARE[2][0])
    if (rightToLeftDiagSum === WINNING_SUM || rightToLeftDiagSum === LOSING_SUM) {
        return [[0, 2], [1, 1], [2, 0]]
    }
}
