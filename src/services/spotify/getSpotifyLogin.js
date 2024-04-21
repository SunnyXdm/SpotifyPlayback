import { CLIENT_ID, REDIRECT_URI, SCOPES } from '../../../config.js';

export default function getSpotifyLogin(id) {
  let url = 'https://accounts.spotify.com/authorize?response_type=code';
  url += `&client_id=${CLIENT_ID}`;
  url += `&redirect_uri=${REDIRECT_URI}`;
  url += `&scope=${SCOPES.join(',')}`;
  url += `&state=${id}`;
  return url;
}
