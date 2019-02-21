export default class CliPresenter {
    static white = '*';
    static black = ' ';

    draw(gameState) {
        const output = gameState.map(row => row.map(cell => cell === 1 ? CliPresenter.white : CliPresenter.black).join('')).join('\n');
        console.log('\x1Bc');
        console.log(output);
    }
}