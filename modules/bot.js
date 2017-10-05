const { activities, numbers } = require('./options');

const activityLog = {};
const bot = {
  start(user) {
    activityLog[user] = {};
    return Promise.resolve({
      text: 'Nice! Which activity did you participate in?',
      attachments: [
        {
          color: '#5A352D',
          callback_id: 'log:select_ac',
          text: '',
          actions: [
            {
              name: 'select_ac',
              type: 'select',
              options: activities,
            },
          ],
        },
      ],
    });
  },

  showDate() {
    return Promise.resolve({
      text: 'Please enter activity date: (dd-mm-yyyy)',
    });
  },

  showCountMenu() {
    return Promise.resolve({
      text: 'How many candidates did you interview/mentor?',
      attachments: [
        {
          color: '#5A352D',
          callback_id: 'log:count',
          text: '',
          actions: numbers,
        },
      ],
    });
  },

  logSelected(user, selected) {
    const categories = [0, 3, 4];
    const activityId = parseInt(selected[0].value, 10);
    const { text, points } = activities[activityId];
    activityLog[user].activity = text;
    activityLog[user].points = parseInt(points, 10);
    if (categories.indexOf(activityId) >= 0) {
      return this.showCountMenu();
    }
    return this.showDate();
  },

  saveCount(user, count) {
    activityLog[user].count = parseInt(count, 10);
    activityLog[user].points *= activityLog[user].count;
    console.log(activityLog);
    return this.showDate();
  },

  saveDate(user, match) {
    const date = match[0];
    activityLog[user].date = date;
    console.log(activityLog);
    return this.showDescription();
  },

  showDescription() {
    return Promise.resolve({
      text: 'Final Step ',
    });
  },

  getProgress(user) {
    if (user in activityLog) {
      console.log(activityLog.user);
      return '';
    }
    return 'start';
  },
};

module.exports = bot;
