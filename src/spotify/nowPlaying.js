import axios from 'axios';

const nowPlaying = async token => {
	try {
		const result = await axios.get(
			'https://api.spotify.com/v1/me/player/currently-playing',
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			}
		);
		return result;
	} catch (error) {
	  throw error;
	}
};

export default nowPlaying;
