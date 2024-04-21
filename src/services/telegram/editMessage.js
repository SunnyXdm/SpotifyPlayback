import axios from 'axios';
import { TELEGRAM_CHANNEL } from '../../../config.js';

const editMessage = async (text, message_id, token) => {
  try {
    const url = `https://api.telegram.org/bot${token}/editMessageText`;
    const result = await axios.post(url, {
      chat_id: TELEGRAM_CHANNEL,
      message_id: message_id,
      parse_mode: 'HTML',
      text: text,
    });
    // console.log('Telegram:', result.data);
    return result.data;
  } catch (error) {
    // console.log('Telegram:', error.response.status, error.response.data);
  }
};

export default editMessage;
