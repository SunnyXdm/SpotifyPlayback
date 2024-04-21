import { config } from 'dotenv';
config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const MONGODB_URI = process.env.MONGODB_URI;
const BOT_TOKENS = JSON.parse(process.env.BOT_TOKENS);
const TELEGRAM_CHANNEL = process.env.TELEGRAM_CHANNEL;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ANIMATION_FILE_ID = process.env.ANIMATION_FILE_ID;
const SCOPES = ['user-read-currently-playing'];
const NGROK_AUTHTOKEN = process.env.NGROK_AUTHTOKEN;

// console.log({
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URI,
//   MONGODB_URI,
//   BOT_TOKENS,
// });
export {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  MONGODB_URI,
  BOT_TOKENS,
  TELEGRAM_CHANNEL,
  SCOPES,
  TELEGRAM_BOT_TOKEN,
  ANIMATION_FILE_ID,
  NGROK_AUTHTOKEN,
};
