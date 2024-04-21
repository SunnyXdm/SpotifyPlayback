import dataFormatter from './dataFormatter.js';
import getCurrentlyPlaying from './getCurrentPlaying.js';
import getRefreshToken from './getRefreshToken.js';

export default async function composer(user, recurrsion = false) {
  try {
    const result = await getCurrentlyPlaying(user.access_token);
    // Not playing anything right now
    if (result.status === 204) {
      return dataFormatter(user, null);
    }
    // Playing something
    else if (result.status === 200) {
      return dataFormatter(user, result);
    }
  } catch (error) {
    if (recurrsion) {
      return dataFormatter(user, JSON.stringify(error.response.data), true);
    }
    // Access Token expired
    if (error.response.status === 401) {
      try {
        // Generate new tokens
        const { access_token, refresh_token } = await getRefreshToken(
          user.refresh_token
        );
        const userData = {
          ...user,
          new_token: true,
          access_token,
          refresh_token,
        };
        const playback = await composer(userData, true);
        return playback;
      } catch (error) {
        return dataFormatter(user, JSON.stringify(error.response.data), true);
      }
    }
    // Rate limit exceeded
    else if (error.response.status === 429) {
      try {
        await sleep(error.response.headers['retry-after'] * 1000);
        const result = await composer(user);
        return result;
      } catch (error) {
        return dataFormatter(user, JSON.stringify(error.response.data), true);
      }
    }
    // Some other error
    else {
      return dataFormatter(user, JSON.stringify(error.response.data), true);
    }
  }
}
