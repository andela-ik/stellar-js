const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const slackInteractiveMessages = require('@slack/interactive-messages');
const { createSlackEventAdapter } = require('@slack/events-api');
const SlackClient = require('@slack/client').WebClient;
const bot = require('./modules/bot');

const dotenv = require('dotenv');

dotenv.load();

const slackEvents = createSlackEventAdapter(process.env.SLACK_VERIFICATION_TOKEN);
const sc = new SlackClient(process.env.SLACK_BOT_TOKEN);
const slackMessages = slackInteractiveMessages
  .createMessageAdapter(process.env.SLACK_VERIFICATION_TOKEN);
const port = process.env.PORT || 3000;

// Attach listeners to events by Slack Event 'type'. See: https://api.slack.com/events/message.im
slackEvents.on('message', (event) => {
  const regex = /^[0-3][0-9]-[0-1][1-9]-20[1-2][0-9]/g;
  const match = regex.exec(event.text);
  if (event.subtype === 'bot_message' || event.subtype === 'message_changed') {
    return;
  } else if (match !== null) {
    console.log();
    bot.saveDate(event.user, match);
    return;
  }
  console.log(match);
  console.log(event);
  sc.chat.postMessage(
    event.channel,
    '',
    {
      attachments: [
        {
          color: '#5A352D',
          title: 'Do you want to log points?',
          callback_id: 'log',
          actions: [
            {
              name: 'yes',
              text: 'Yes',
              type: 'button',
              value: 'log',
            },
            {
              name: 'no',
              text: 'No',
              type: 'button',
              value: 'no',
            },
          ],
        },
      ],
    },
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    },
  );
});

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);

slackMessages.action('log', (payload, respond) => {
  const user = payload.user.id;
  if (payload.actions[0].name === 'yes') {
    bot
      .start(user)
      .then(respond)
      .catch(console.error);
    return { text: 'Just a sec' };
  }
  return { text: 'Then why did you wake me up? :rage:' };
});

slackMessages.action('log:select_ac', (payload, respond) => {
  const user = payload.user.id;
  const selected = payload.actions[0].selected_options;
  bot.logSelected(user, selected)
    .then(respond)
    .catch(console.error);
  return { text: 'Just a few more details' };
});

slackMessages.action('log:count', (payload, respond) => {
  const user = payload.user.id;
  const selected = payload.actions[0].value;
  bot.saveCount(user, selected)
    .then(respond)
    .catch(console.error);
  return { text: 'Last question, I promise!! :smile:' };
});

// Start a basic HTTP server
const app = express();
app.use(bodyParser.json());
app.use('/slack/events', slackEvents.expressMiddleware());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/slack/actions', slackMessages.expressMiddleware());
// Start the server
http.createServer(app).listen(port, () => {
  console.log(`server listening on port ${port}`);
});
