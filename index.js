import getUsers from './src/database/getUsers.js';
import spotify from './src/spotify/spotify.js';
import telegram from './src/telegram/telegram.js';
import sleep from './src/utils/sleep.js';
import updateTokens from './src/utils/updateTokens.js';
import telegraph from './src/telegraph/telegraph.js';

//main function to combine everything together
const main = async () => {
	const start = Date.now();
	const users = await getUsers();
	const playback = await spotify(users);
	const playbackCopy = [...playback];
	await Promise.all([telegram(playback), updateTokens(playbackCopy), telegraph(playbackCopy)]);
	const end = Date.now();
	const timeTaken = end - start;
	if (timeTaken < 20000) {
		await sleep(20000 - timeTaken);
	}
};

const run = async () => {
	while (true) {
		const start = Date.now();
		await main();
		const end = Date.now();
		console.log(end - start);
	}
};
run();
