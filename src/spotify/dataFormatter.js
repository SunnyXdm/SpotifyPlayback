const dataFormatter = (user, data, error) => {
	if (data === null) {
		return {
			user_id: user.user_id,
			name: user.name,
			message_id: user.message_id,
			status: null
		};
	} else if (error) {
		return {
			user_id: user.user_id,
			name: user.name,
			message_id: user.message_id,
			status: 'error',
			error: data
		};
	} else {
		return {
			user_id: user.user_id,
			name: user.name,
			message_id: user.message_id,
			status: {
				song: data.data.item.name,
				song_link: data.data.item.external_urls.spotify,
				artist: data.data.item.artists[0].name,
				artist_link: data.data.item.artists[0].external_urls.spotify,
				album_art: data.data.item.album.images[0].url
				duration: data.data.item.duration_ms,
				progress: data.data.progress_ms
			}
		};
	}
};
export default dataFormatter;
