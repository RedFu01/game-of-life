export default class Game {
    constructor(gameState) {
        this.gameState = gameState;
    }

    start() {
        const gameStateCopy = JSON.parse(JSON.stringify(this.gameState));

        const iterationCount = 0;

        while (true) {
            iterationCount++;
        }



        const sum = arr => arr.reduce((res, curr) => res + curr, 0);
        const flatten = arr => arr.reduce((res, curr) => [...res, ...curr], []);

        const dataSum = sum(flatten(this.gameState));
        const iterationCount = dataSum;

        return {
            iterationCount
        };
    }
}