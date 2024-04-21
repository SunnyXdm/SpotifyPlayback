import axios from 'axios';
import { TELEGRAM_BOT_TOKEN } from '../../../config.js';

export default async function updateWebhook(url) {
  try {
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/deleteWebhook`,
      {
        drop_pending_updates: true,
      }
    );
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook`,
      {
        url,
      }
    );
    console.log('Telegram webhook set:');
  } catch (err) {
    console.log(
      'Telegram setWebhook error:',
      err.response.status,
      err.response.data
    );
  }
}
