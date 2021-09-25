import nowPlaying from './nowPlaying.js';
import refreshToken from './refreshToken.js';
import sleep from '../utils/sleep.js';
import dataFormatter from './dataFormatter.js';

const composer = async user => {
	// Check Playback
	try {
		const result = await nowPlaying(user.spotify_token);
		// No Playback
		if (result.status === 204) {
			return dataFormatter(user, null);
		}
		// Playblack
		else if (result.status === 200) {
			return dataFormatter(user, result);
		}
	} catch (err) {
		// Access Token expired
		if (err.response) {
			if (err.response.status === 401)
				try {
					// Generate new tokens
					const newTokens = await refreshToken(user.refresh_token);
					const newUserData = {
						user_id: user.user_id,
						name: user.name,
						message_id: user.message_id,
						spotify_token: newTokens.spotify_token
					};
					const playback = await composer(newUserData);
					playback.new_token = true;
					playback.tokens = newTokens;
					return playback;
				} catch (err) {
					console.log('Spotify:', user.user_id, err.response.data);
					return dataFormatter(user, JSON.stringify(err.response.data), true);
				}
			else if (err.response.status === 429) {
				try {
					await sleep(err.response.headers['retry-after'] * 1000);
					const result = await composer(user);
					return result;
				} catch (error) {
					console.log('Spotify:', user.user_id, error.response.data);
					return dataFormatter(user, JSON.stringify(error.response.data), true);
				}
			} else {
				console.log(
					'Spotify:',
					err.response.data,
					err.response.headers['retry-after']
				);
				console.log(user.user_id, user.name, user.message_id);
				return dataFormatter(user, JSON.stringify(err.response.data), true);
			}
		} else {
			const newResult = await composer(user);
			return newResult;
		}
	}
};

export default composer;
