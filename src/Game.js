import GameState from './GameState';

export default class Game {
    constructor(initialState, historySize) {
        this.gameState = new GameState(initialState, historySize);
    }

    async start() {
        let iterationCount = 0;
        const cliOutput = this.gameState.state.map(row => row.join(',')).join('\n');
        console.log(cliOutput);
        while (!this.gameState.isOver()) {
            await new Promise(resolve => setTimeout(resolve, 200));
            this.gameState = this.gameState.next();
            iterationCount++;
            const cliOutput = this.gameState.state.map(row => row.join(',')).join('\n');
            console.log('\n' + cliOutput);

        }

        return {
            iterationCount,
            result: this.gameState.state.map(s => s.join(',')).join('\n'),
        };
    }

    print() {

    }
}
