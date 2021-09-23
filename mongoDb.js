//const { MongoClient } = require('mongodb');
import { MongoClient } from 'mongodb';
import { MongoDbUri } from './config.js';

const getUsers = async () => {
	const client = new MongoClient(MongoDbUri);
	await client.connect();
	const database = client.db('SpotifyPlayback'); //SpotifyPlayback');
	const users = await database
		.collection('users')
		.find()
		.toArray();
	client.close();
	return users;
};

const updateUser = async (id, data) => {
	const client = new MongoClient(MongoDbUri);
	await client.connect();
	const database = client.db('SpotifyPlayback'); //SpotifyPlayback');
	const users = await database.collection('users');
	const result = await users.updateOne(
		{ name: id },
		{ $set: data },
		{ upsert: false }
	);
	await client.close();
};

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

export { getUsers, updateUser, bulkUserUpdate };
