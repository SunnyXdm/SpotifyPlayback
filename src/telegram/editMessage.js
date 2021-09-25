import axios from 'axios';

const editMessage = async (text, message_id, token) => {
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
		const err = error;
		//console.log('Telegram:',error.response.data);
	}
};

export default editMessage;
