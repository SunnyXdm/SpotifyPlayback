import axios from 'axios';
export default async function getCurrentlyPlaying(access_token) {
  try {
    const { data, status } = await axios.get(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return { ...data, status };
  } catch (err) {
    throw err;
  }
}
