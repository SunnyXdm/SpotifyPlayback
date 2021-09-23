import { getUsers, updateUser, bulkUserUpdate } from './mongoDb.js';
import { Spotify } from './spotify.js';
import { tgPost } from './telegram.js';

const sleep = ms => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

//updating the users database with new tokens
const updateDb = async status => {
	const updateData = [];
	status.map(user => {
		if (user.new_token) {
			updateData.push({
				updateOne: {
					filter: { _id: user.user_id },
					update: { $set: user.tokens },
					upsert: false
				}
			});
		}
	});
	if (!!updateData.length) {
		bulkUserUpdate(updateData);
		console.log('DB Updated');
	}
};

//main function to combine everything together
const main = async () => {
	const start = Date.now();
	const users = await getUsers();
	const playback = await Spotify(users);
	const playbackCopy = [...playback];
	await Promise.all([tgPost(playback), updateDb(playbackCopy)]);
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
		console.log(end-start);
	}
};
run();
// setInterval(async () => {
// 	const start = Date.now();
// 	await main()
// 	const end = Date.now();
// 	console.log(end-start)
// 	}, 20000)