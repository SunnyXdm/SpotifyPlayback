import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET } from '../../config.js';

const refreshToken = async refresh_token => {
	try {
		const dataString = `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${refresh_token}`;
		const result = await axios.post(
			'https://accounts.spotify.com/api/token',
			dataString
		);
		return result;
	} catch (error) {
		return error;
	}
};

export default refreshToken;