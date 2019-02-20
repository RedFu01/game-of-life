import gameOfLife from '../src/gameOfLife.js'

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