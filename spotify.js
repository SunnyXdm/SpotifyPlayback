import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET } from './config.js';

const sleep = ms => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

const spotifyNow = async user => {
	// Check Playback
	try {
		const result = await axios.get(
			'https://api.spotify.com/v1/me/player/currently-playing',
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.spotify_token}`
				}
			}
		);
		// No Playback
		if (result.status === 204) {
			return {
				user_id: user.user_id,
				name: user.name,
				message_id: user.message_id,
				status: null
			};
		}
		// Playblack
		else if (result.status === 200) {
			return {
				user_id: user.user_id,
				name: user.name,
				message_id: user.message_id,
				status: {
					song: result.data.item.name,
					song_link: result.data.item.external_urls.spotify,
					artist: result.data.item.artists[0].name,
					artist_link: result.data.item.artists[0].external_urls.spotify,
					duration: result.data.item.duration_ms,
					progress: result.data.progress_ms
				}
			};
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
					const playback = await spotifyNow(newUserData);
					playback.new_token = true;
					playback.tokens = newTokens;
					return playback;
				} catch (err) {
					console.log('Spotify:', err.response.data);
					console.log(user.user_id);
					return {
						user_id: user.user_id,
						name: user.name,
						message_id: user.message_id,
						status: 'error',
						error: JSON.stringify(err.response.data)
					};
				}
			else if (err.response.status === 429) {
				try {
					await sleep(err.response.headers['retry-after'] * 1000);
					const result = await spotifyNow(user);
					return result;
				} catch (error) {
					console.log('Spotify:', err.response.data);
					console.log(user.user_id);
					return {
						user_id: user.user_id,
						name: user.name,
						message_id: user.message_id,
						status: 'error',
						error: JSON.stringify(err.response.data)
					};
				}
			} else {
				console.log(
					'Spotify:',
					err.response.data,
					err.response.headers['retry-after']
				);
				console.log(user.user_id, user.name, user.message_id);
				return {
					user_id: user.user_id,
					name: user.name,
					message_id: user.message_id,
					status: 'error',
					error: JSON.stringify(err.response.data)
				};
			}
		} else {
			const newResult = await spotifyNow(user);
			return newResult;
		}
	}
};

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
	} catch (err) {
		throw err;
	}
};

const Spotify = async users => {
	const results = [];
	do {
		let requests = await axios.all(
			users.splice(0, 15).map(user => spotifyNow(user))
		);
		await sleep(1000)
		results.push(...requests);
	} while (!users.length === 0);
	return results;
};

export { Spotify };