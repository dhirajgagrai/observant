const { CronJob } = require('cron');

const observant = require('./observant');

// Every 1 hour
module.exports = new CronJob('0 0 */1 * * *', () => {
  console.log('\nCron Job Running');
  observant();
});
