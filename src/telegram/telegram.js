import axios from 'axios';
import { botTokens } from '../../config.js';
import editMessage from './editMessage.js';
import sleep from '../utils/sleep.js';

const telegram = async users => {
	do {
		let tokens = [...botTokens];
		const result = await axios.all(
			users.splice(0, botTokens.length).map(user => {
				if (user.status === null) {
					const text = `<a href="tg://user?id=${user.user_id}">${user.name}</a> is not listening to anything right now`;
					editMessage(text, user.message_id, tokens.splice(0, 1)[0]);
				} else if (user.status === 'error') {
				  const text = `${user.error}`;
					editMessage(text, user.message_id, tokens.splice(0, 1)[0]);
				} else {
					const text = `<a href="tg://user?id=${user.user_id}">${user.name}</a> is listening to <a href="${user.status.song_link}">${user.status.song}</a> by <a href="${user.status.artist_link}">${user.status.artist}</a>`;
					editMessage(text, user.message_id, tokens.splice(0, 1)[0]);
				}
			})
		);
		await sleep(1000)
	} while (users.length !== 0);
};

export default telegram;
