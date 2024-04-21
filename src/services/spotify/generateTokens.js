import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '../../../config.js';

export default async function generateTokens(code) {
  try {
    const { data } = await axios.post(
      'https://accounts.spotify.com/api/token',
      {
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return data;
  } catch (error) {
    console.log(
      error.response.status,
      error.response.data,
      error.response.body
    );
    throw error;
  }
}
