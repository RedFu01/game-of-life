import gameOfLife from '../src/gameOfLife.js';
import Game from '../src/Game';

test('Test that the saved game file is properly read', () => {
    let output = '';
    console.log = input => output += input;
    gameOfLife('./data/empty4x4.json');

    expect(output).toBe([
        '0000',
        '0000',
        '0000',
        '0000'
    ].join('\n'));
});

test('Test game is over', () => {
    const gameSummary = gameOfLife('./data/empty4x4.json');
    expect(gameSummary.iterationCount).toBe(0);
});

test('Test game with just one life is over on the second iteration', () => {
    const gameSummary = gameOfLife('./data/001-in-4x4.json');
    expect(gameSummary.iterationCount).toBe(1);
});

test('Test game with two spread life is over on the second iteration', () => {
    const gameSummary = gameOfLife('./data/002-in-4x4.json');
    expect(gameSummary.iterationCount).toBe(1);
});

test('Test game with three spread life is over on third iteration', () => {
    const gameSummary = gameOfLife('./data/003-in-4x4.json');
    expect(gameSummary.iterationCount).toBe(2);
});

test('Test next cell state is dead if only two neighbours', () => {

    const state = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 1, 0]
    ];

    const cellState = Game.getNextCellState(state, 1,1);

    expect(cellState).toBe(0);
});

test('Test cell survives if 3 neighbours', () => {

    const state = [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
    ];

    const cellState = Game.getNextCellState(state, 1,1);

    expect(cellState).toBe(1);
});


test('Test game with maxIteration', () => {
    const gameSummary = gameOfLife('./data/infinite-in-5x5.json', { maxIteration: 2 });
    expect(gameSummary.iterationCount).toBe(2);
    expect(gameSummary.result).toBe([
        [0,0,0,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,0,0,0]
    ])
});