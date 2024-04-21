import {
  ANIMATION_FILE_ID,
  CLIENT_SECRET,
  TELEGRAM_CHANNEL,
} from '../../../config.js';
import User from '../mongo/User.model.js';
import express from 'express';
import getSpotifyLogin from '../spotify/getSpotifyLogin.js';
import sendAnimation from '../telegram/sendAnimation.js';
import generateTokens from '../spotify/generateTokens.js';
import sendMessage from '../telegram/sendMessage.js';
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.post(`/webhook${CLIENT_SECRET}`, async (req, res) => {
  res.send('working');
  // console.log('webhook', req.query, req.body, req.params);
  if (req.body.message?.chat?.type !== 'private') return;
  if (req.body.message?.text === '/start') {
    await sendAnimation(
      req.body.message.chat.id,
      ANIMATION_FILE_ID,
      `Hi\\.\nI let your bio show what you're listening to on your Spotify, unlike userbots I wont get your telegram account banned/restricted\\.\n\nTo create your instance simply tap /login and Authenticate your ***Spotify***`
    );
  } else if (req.body.message?.text === '/login') {
    const exists = await User.findOne({
      user_id: req.body.message.from.id,
    });
    let user = null;
    if (exists) {
      user = exists;
    } else {
      user = await User.create({
        user_id: req.body.message.from.id,
        name: req.body.message.from.first_name,
      });
    }

    const loginUrl = getSpotifyLogin(user._id.toString());
    await sendAnimation(
      req.body.message.chat.id,
      ANIMATION_FILE_ID,
      `Tap below button to link your account.`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Authorize Spotify',
                url: loginUrl,
              },
            ],
          ],
        },
        parse_mode: 'HTML',
      }
    );
  }
});

app.get('/callback', async (req, res) => {
  res.json({ ok: req.query?.code ? true : false });
  console.log('login', req.query, req.body, req.params);
  const { code, state } = req.query;
  if (code && state) {
    const { access_token, refresh_token } = await generateTokens(code);
    const user = await User.findOne({ _id: state }).lean();
    const message = await sendMessage(
      TELEGRAM_CHANNEL,
      `Connecting spotify for <a href="tg://user?id=${user.user_id}">${user.name}</a>`,
      { parse_mode: 'HTML' }
    );
    if (message?.result?.message_id) {
      await User.findOneAndUpdate(
        { _id: state },
        {
          access_token,
          refresh_token,
          message_id: message.result.message_id,
        },
        { new: true, useFindAndModify: false }
      );
      let text = `*You are successfully logged in*\n\n`;
      text += `[Here](t.me/SpotifyPlayback/${message.result.message_id}) is the link to your playback status:\n`;
      text += '`t.me/SpotifyPlayback/' + message.result.message_id + '`\n';
      text += `Put it in your bio, channel or anywhere you want to & have fun\\!`;
      await sendMessage(user.user_id, text, {
        parse_mode: 'MarkdownV2',
      });
      console.log(`logged in: ${user.name}`);
    }
  }
});
app.listen(4000, () => console.log('Server is running...'));
