export default class GameState {
    constructor(state, historySize, currentHistory = []) {
        this.history = currentHistory;
        this.historySize = historySize;
        this.state = state;
    }

    getHash() {
        const flatten = arr => arr.reduce((res, curr) => [...res, ...curr], []);
        const flatenned = flatten(this.state);
        return flatenned.join('');
    }

    isOver() {
        const sum = arr => arr.reduce((res, curr) => res + curr, 0);
        const flatten = arr => arr.reduce((res, curr) => [...res, ...curr], []);
        const flatenned = flatten(this.state);
        const gameHash = this.getHash();
        return sum(flatenned) === 0 || this.history.includes(gameHash);
    }

    next() {
        const gameStateCopy = JSON.parse(JSON.stringify(this.state));

        for (let i = 0; i < gameStateCopy.length; i++) {
            for (let j = 0; j < gameStateCopy[i].length; j++) {
                gameStateCopy[i][j] = this.getNextCellState(i, j);
            }
        }

        const history = [...this.history, this.getHash()].slice(-this.historySize);
        return new GameState(gameStateCopy, this.historySize, history);
    }

    getNeighbours(x, y) {
        const neighbours = [];
        for (let i = 0; i < this.state.length; i++) {
            for (let j = 0; j < this.state[i].length; j++) {
                if (Math.abs(x - i) <= 1 && Math.abs(y - j) <= 1) {
                    if (!(x === i && y === j)) {
                        neighbours.push(this.state[i][j]);
                    }
                }
            }
        }

        return neighbours;
    }

    getAliveNeighbourCount(x, y) {
        const neighbours = this.getNeighbours(x, y);
        const aliveNeighbours = neighbours.filter(n => n === 1).length;
        return aliveNeighbours;
    }

    getNextCellState(x, y) {
        const currentState = this.state[x][y];
        if (currentState === 1) {
            return Number([2, 3].includes(this.getAliveNeighbourCount(x, y)));
        } else {
            return Number(this.getAliveNeighbourCount(x, y) === 3);
        }
    }
}