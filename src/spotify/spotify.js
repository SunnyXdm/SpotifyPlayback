import axios from 'axios';
import sleep from '../utils/sleep.js';
import composer from './composer.js'

const spotify = async users => {
	const results = [];
	do {
		let requests = await axios.all(
			users.splice(0, 15).map(user => composer(user))
		);
		await sleep(1000);
		results.push(...requests);
	} while (users.length !== 0);
	return results;
};

export default spotify;
