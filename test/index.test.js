import gameOfLife from '../src/gameOfLife.js';
import GameState from '../src/GameState.js';

test('Test that the saved game file is properly read', async () => {
    const summary = await gameOfLife('./data/empty4x4.json');

    expect(summary.result).toBe([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ].join('\n'));
});

test('Test game is over', async () => {
    const gameSummary = await gameOfLife('./data/empty4x4.json');
    expect(gameSummary.iterationCount).toBe(0);
});

test('Test game with just one life is over on the second iteration', async () => {
    const gameSummary = await gameOfLife('./data/001-in-4x4.json');
    expect(gameSummary.iterationCount).toBe(1);
});

test('Test game with two spread life is over on the second iteration', async () => {
    const gameSummary = await gameOfLife('./data/002-in-4x4.json');
    expect(gameSummary.iterationCount).toBe(1);
});

test('Test game with three spread life is over on third iteration', async () => {
    const gameSummary = await gameOfLife('./data/003-in-4x4.json');
    expect(gameSummary.iterationCount).toBe(2);
});

test('Test next cell state is dead if only two neighbours', () => {
    const state = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 1, 0]
    ];
    const gameState = new GameState(state, Infinity);
    const cellState = gameState.getNextCellState(1, 1);

    expect(cellState).toBe(0);
});

test('Test cell survives if 3 neighbours', () => {
    const state = [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
    ];

    const gameState = new GameState(state, Infinity);
    const cellState = gameState.getNextCellState(1, 1);

    expect(cellState).toBe(1);
});

test('Game is over when board is same for last 2 turns', async () => {
    const gameSummary = await gameOfLife('./data/infinite-in-5x5.json');
    expect(gameSummary.iterationCount).toBe(2);
    expect(gameSummary.result).toEqual([
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ].join('\n'))
});

// test('Game is over when board is same for last 2 turns with a wrapping board', () => {
//     const gameSummary = gameOfLife('./data/infinite-in-5x5-right-aligned.json');
//     expect(gameSummary.iterationCount).toBe(2);
//     expect(gameSummary.result).toEqual([
//         [0,0,0,0,0],
//         [0,0,0,0,1],
//         [0,0,0,0,1],
//         [0,0,0,0,1],
//         [0,0,0,0,0]
//     ])
// });

test('Game prints its initial state to the screen', async () => {
    let terminalOutput = '';
    console.log = input => terminalOutput += input;
    await gameOfLife('./data/001-in-4x4.json');

    const output = [
        [0, 0, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ].map(row => row.join(',')).join('\n') + '\n' +
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ].map(row => row.join(',')).join('\n')

    expect(terminalOutput).toEqual(output);
});

test('Game prints every state to the screen', async () => {
    let terminalOutput = '';
    console.log = input => terminalOutput += input;
    await gameOfLife('./data/003-in-4x4.json');

    const output = [
        [0, 0, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1]
    ].map(row => row.join(',')).join('\n') + '\n' +
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 1, 1],
            [0, 0, 0, 0]
        ].map(row => row.join(',')).join('\n') + '\n' +
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ].map(row => row.join(',')).join('\n')

    expect(terminalOutput).toEqual(output);
});
