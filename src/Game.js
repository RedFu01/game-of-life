export default class Game {
    constructor(gameState, historySize) {
        this.gameState = gameState;
        this.historySize = historySize;
        this.history = [];
    }

    start() {
        const sum = arr => arr.reduce((res, curr) => res + curr, 0);
        const flatten = arr => arr.reduce((res, curr) => [...res, ...curr], []);

        let iterationCount = 0;
        while (true) {
            const flatenned = flatten(this.gameState);
            const gameHash = flatenned.join('');
            if (sum(flatenned) === 0 || this.history.includes(gameHash)) {
                break;
            }
            this.history.push(gameHash);
            this.history = this.history.slice(-this.historySize);

            this.gameState = this.createNextState();

            iterationCount++;
        }

        return {
            iterationCount,
            result: this.gameState,
        };
    }

    static getNeighbours(gameState, x, y) {
        const neighbours = [];
        for (let i = 0; i < gameState.length; i++) {
            for (let j = 0; j < gameState[i].length; j++) {
                if (Math.abs(x - i) <= 1 && Math.abs(y - j) <= 1) {
                    if (!(x === i && y === j)) {
                        neighbours.push(gameState[i][j]);
                    }
                }
            }
        }

        return neighbours;
    }

    static getAliveNeighbourCount(gameState, x, y) {
        const neighbours = Game.getNeighbours(gameState, x, y);
        const aliveNeighbours = neighbours.filter(n => n === 1).length;
        return aliveNeighbours;
    }

    static getNextCellState(gameState, i, j) {
        const currentState = gameState[i][j];

        if (currentState === 1) {
            return Number([2, 3].includes(Game.getAliveNeighbourCount(gameState, i, j)));
        } else {
            return Number(Game.getAliveNeighbourCount(gameState, i, j) === 3);
        }
    }

    createNextState() {
        const gameStateCopy = JSON.parse(JSON.stringify(this.gameState));

        for (let i = 0; i < gameStateCopy.length; i++) {
            for (let j = 0; j < gameStateCopy[i].length; j++) {

                gameStateCopy[i][j] = Game.getNextCellState(this.gameState, i, j);
            }
        }

        return gameStateCopy;
    }
}
