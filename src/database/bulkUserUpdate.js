import { MongoClient } from 'mongodb';
import { MongoDbUri } from '../../config.js';

const bulkUserUpdate = async updateData => {
	try {
		const client = new MongoClient(MongoDbUri);
		await client.connect();
		const database = client.db('SpotifyPlayback'); //SpotifyPlayback');
		const users = await database.collection('users');
		const result = await users.bulkWrite(updateData);
		await client.close();
		console.log(result);
	} catch (error) {
		console.log(error);
	}
};
export default bulkUserUpdate;
