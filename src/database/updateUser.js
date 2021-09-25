import { MongoClient } from 'mongodb';
import { MongoDbUri } from '../../config.js';

const updateUser = async (id, data) => {
	try {
		const client = new MongoClient(MongoDbUri);
		await client.connect();
		const database = client.db('SpotifyPlayback');
		const users = await database.collection('users');
		const result = await users.updateOne(
			{ name: id },
			{ $set: data },
			{ upsert: false }
		);
		await client.close();
	} catch (error) {
		console.log(error);
	}
};

export default updateUser;
