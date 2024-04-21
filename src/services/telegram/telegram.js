import axios from 'axios';
import editMessage from './editMessage.js';
import { BOT_TOKENS } from '../../../config.js';
import sleep from '../../utils/sleep.js';
import getArrayInChunks from '../../utils/getArrayInChunks.js';
import progressBar from '../../utils/progressBar.js';
import msFormatter from '../../utils/msFormatter.js';

const telegram = async (users) => {
  let tokens = [...BOT_TOKENS];
  const chunks = getArrayInChunks(users, BOT_TOKENS.length);
  // console.log('chunks', chunks);
  for (const users of chunks) {
    await axios.all(
      users.map((user) => {
        if (user.status === null) {
          const text = `<a href="tg://user?id=${user.user_id}">${user.name}</a> is not listening to anything right now`;
          editMessage(text, user.message_id, tokens.splice(0, 1)[0]);
        } else if (user.status === 'error') {
          const text = `error: ${user.error}\ncontact @SpotifyPlaybackSupport`;
          editMessage(text, user.message_id, tokens.splice(0, 1)[0]);
        } else {
          const text = `<a href="tg://user?id=${user.user_id}">${
            user.name
          }</a> is listening to <a href="${user.status.song_link}">${
            user.status.song
          }</a> by ${user.status.artists
            .map(
              (artist) =>
                `<a href="${artist.external_urls.spotify}">${artist.name}</a>`
            )
            .join(', ')}\n${msFormatter(user.status.progress)} ${progressBar(
            user.status.duration,
            user.status.progress
          )} ${msFormatter(user.status.duration - user.status.progress)}`;
          editMessage(text, user.message_id, tokens.splice(0, 1)[0]);
        }
      })
    );
    await sleep(1000);
  }
};

export default telegram;
