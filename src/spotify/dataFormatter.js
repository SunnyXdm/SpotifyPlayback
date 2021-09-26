const dataFormatter = (user, data, error) => {
	if (data === null) {
		user.status = null;
		return user;
	} else if (error) {
		user.status = 'error';
		user.error = data;
		return user;
	} else {
		user.status = {
			song: data.data.item.name,
			song_link: data.data.item.external_urls.spotify,
			artist: data.data.item.artists[0].name,
			artist_link: data.data.item.artists[0].external_urls.spotify,
			album_art: data.data.item.album.images[0].url,
			preview_url: data.data.item.preview_url,
			duration: data.data.item.duration_ms,
			progress: data.data.progress_ms
		};
		return user;
	}
};
export default dataFormatter;
