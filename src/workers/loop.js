import { Worker, workerData } from 'worker_threads';
import sleep from '../utils/sleep.js';
import spotify from '../services/spotify/spotify.js';
import telegram from '../services/telegram/telegram.js';
import mongoose from 'mongoose';
import { MONGODB_URI } from '../../config.js';
import User from '../services/mongo/User.model.js';

await mongoose.connect(MONGODB_URI);

async function main() {
  while (true) {
    // get data from db
    try {
      const users = await User.find().lean();
      // get data from spotify
      const playback = await spotify(users);
      // update telegram
      await telegram(playback);
      // update db
      const update = playback
        .filter(({ new_token }) => new_token)
        .map(({ _id, access_token, refresh_token }) => {
          return {
            updateOne: {
              filter: { _id },
              update: {
                $set: {
                  access_token: access_token,
                  refresh_token: refresh_token,
                },
              },
            },
          };
        });
      await User.bulkWrite(update);
      await sleep(1000);
    } catch (error) {
      console.log('error in loop:', error);
    }
  }
}
main();
