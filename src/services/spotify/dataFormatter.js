export default function dataFormatter(user, data, error) {
  if (data === null) {
    user.status = null;
    return user;
  } else if (error) {
    user.status = 'error';
    user.error = data;
    return user;
  } else {
    user.status = {
      song: data.item.name,
      song_link: data.item.external_urls.spotify,
      artists: data.item.artists,
      album_art: data.item.album.images[0].url,
      preview_url: data.item.preview_url,
      duration: data.item.duration_ms,
      progress: data.progress_ms,
    };
    return user;
  }
}
