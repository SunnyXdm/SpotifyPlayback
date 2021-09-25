import { MongoClient } from 'mongodb';
import { MongoDbUri } from '../../config.js';

const getUsers = async () => {
	try {
		const client = new MongoClient(MongoDbUri);
		await client.connect();
		const database = client.db('SpotifyPlayback'); //SpotifyPlayback');
		const users = await database
			.collection('users')
			.find()
			.toArray();
		client.close();
		return users;
	} catch (error) {
		console.log(error);
	}
};

export default getUsers;
