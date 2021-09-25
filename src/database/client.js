import { MongoClient } from 'mongodb';
import { MongoDbUri } from '../../config.js';
import sleep from '../utils/sleep.js'

let usersCollection;
const db = {
	connectDb: async () => {
		const client = new MongoClient(MongoDbUri);
		await client.connect();
		const database = client.db('SpotifyPlayback'); //SpotifyPlayback');
		usersCollection = await database.collection('users');
		console.log(usersCollection.find());
	},
	getCollection: () => {
		return usersCollection;
	}
};