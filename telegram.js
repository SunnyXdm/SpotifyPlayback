import axios from 'axios';
import { botTokens } from './config.js';

const tgPostHelper = async (text, message_id, token) => {
	try {
		const channel_username = '@SpotifyPlayback';
		const url = `https://api.telegram.org/bot${token}/editMessageText`;
		const result = await axios.post(url, {
			chat_id: channel_username,
			message_id: message_id,
			parse_mode: 'HTML',
			text: text
		});
		return result.data;
	} catch (error) {
	  const err = error
		//console.log('Telegram:',error.response.data);
	}
};

const sleep = ms => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

const tgPost = async users => {
	do {
		let tokens = [...botTokens];
		const result = await axios.all(
			users.splice(0, botTokens.length).map(user => {
				if (user.status === null) {
					const text = `<a href="tg://user?id=${user.user_id}">${user.name}</a> is not listening to anything right now`;
					tgPostHelper(text, user.message_id, tokens.splice(0, 1)[0]);
				} else if (user.status === 'error') {
				  const text = `${user.error}`;
					tgPostHelper(text, user.message_id, tokens.splice(0, 1)[0]);
				} else {
					const text = `<a href="tg://user?id=${user.user_id}">${user.name}</a> is listening to <a href="${user.status.song_link}">${user.status.song}</a> by <a href="${user.status.artist_link}">${user.status.artist}</a>`;
					tgPostHelper(text, user.message_id, tokens.splice(0, 1)[0]);
				}
			})
		);
		await sleep(1000)
	} while (users.length !== 0);
};

export { tgPost };
