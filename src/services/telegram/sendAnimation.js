import axios from 'axios';
import { TELEGRAM_BOT_TOKEN } from '../../../config.js';

export default async function sendAnimation(
  chat_id,
  animation,
  caption,
  config = {}
) {
  try {
    const { data, status } = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendAnimation`,
      {
        chat_id,
        animation: animation,
        caption: caption || '',
        parse_mode: 'MarkdownV2',
        ...config,
      }
    );
    return { ...data, status };
  } catch (err) {
    console.log('Telegram:', err.response.status, err.response.data, caption);
  }
}
