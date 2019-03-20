import fs  from 'fs';
import Game from './Game';

function readFile(filePath) {
    const raw = fs.readFileSync(filePath);
    return JSON.parse(raw);
} 

const defaultConfig = {
	loopMemory: Infinity,
}

export default async function gameOfLife(filePath, config = defaultConfig) {
    const data = readFile(filePath);
    const game = new Game(data, config.loopMemory);
    const summary = await game.start();
    return summary;
};