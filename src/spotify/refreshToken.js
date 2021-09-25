import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET } from '../../config.js';

const refreshToken = async refresh_token => {
	try {
		const dataString = `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${refresh_token}`;
		const result = await axios.post(
			'https://accounts.spotify.com/api/token',
			dataString
		);
		if (result.data.refresh_token) {
			return {
				refresh_token: result.data.refresh_token,
				spotify_token: result.data.access_token
			};
		} else {
			//if (result.data.spotify_token)
			return {
				spotify_token: result.data.access_token
			};
		}
	} catch (error) {
		return error;
	}
};

export default refreshToken;
