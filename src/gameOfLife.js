import fs  from 'fs';
import Game from './Game';

function readFile(filePath) {
    const raw = fs.readFileSync(filePath);
    return JSON.parse(raw);
} 

export default function gameOfLife(filePath) {
    const data = readFile(filePath);

    const game = new Game(data);
    const summary = game.start();

    const cliOutput = data.map(row => row.join('')).join('\n');
    console.log(cliOutput);

    return summary;
};