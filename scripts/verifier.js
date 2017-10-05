const { exec } = require('child_process');
const dotenv = require('dotenv');

dotenv.load();

const token = process.env.SLACK_VERIFICATION_TOKEN;

exec('./node_modules/.bin/slack-verify --token ' + token + ' --path=/slack/events --port=3000', (err, stdOut, stdErr) => {});
