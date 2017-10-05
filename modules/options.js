const activities = [
  {
    text: 'Interviewing candidates for a Fellow Recruiting event',
    value: 0,
    points: 50,
  },
  {
    text: 'Guide applicants with the recruitment team during Open Saturdays',
    value: 1,
    points: 50,
  },
  {
    text: 'Participating in a Hackathon',
    value: 2,
    points: 100,
  },
  {
    text: 'Mentor a prospect for Andela 21',
    value: 3,
    points: 250,
  },
  {
    text: 'Mentor students outside of Andela (eg. via SheLovesCode)',
    value: 4,
    points: 250,
  },
  {
    text: 'Write a blog that is published on Andela\'s website',
    value: 5,
    points: 1000,
  },
  {
    text: 'Participating in an Andela marketing event with clients',
    value: 6,
    points: 2000,
  },
  {
    text: 'Organizing a tech event',
    value: 7,
    points: 2500,
  },
  {
    text:
      'Starting an Open Source Project which has at least 40 stars from non-Andelans',
    value: 8,
    points: 2500,
  },
  {
    text: 'Participating in a press interview for Andela marketing',
    value: 9,
    points: 3000,
  },
  {
    text: 'Build an app that is marketed on Andela\'s website',
    value: 10,
    points: 10000,
  },
];

const numbers = Array.apply(null, Array(10)).map((_, i) => {
  const number = i + 1;
  return {
    name: number,
    text: number,
    type: 'button',
    value: number,
  };
});

module.exports = {
  activities,
  numbers,
};
