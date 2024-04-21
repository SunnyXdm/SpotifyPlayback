import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '../../../config.js';

export default async function getRefreshToken(refresh_token) {
  try {
    const { data } = await axios.post(
      'https://accounts.spotify.com/api/token',
      {
        grant_type: 'refresh_token',
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token ?? refresh_token,
    };
  } catch (err) {
    throw err;
  }
}
