import axios from 'axios';
import { TELEGRAM_BOT_TOKEN } from '../../../config.js';

export default async function sendMessage(chat_id, text, config = {}) {
  try {
    const { data, status } = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id,
        text,
        ...config,
      }
    );
    return { ...data, status };
  } catch (err) {
    throw err;
  }
}
