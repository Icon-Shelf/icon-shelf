const ua = require('universal-analytics');
const uuid = require('uuid');
import store from './store';
const os = require('os');

const userId = store.get('userId') || uuid.v4();

store.set('userId', userId);

function activateAnalytics() {
  const user = ua('UA-138326907-3', userId);

  user.pageview('/').send();

  user.event('Platform', `${process.platform}`, `${os.release()}`).send();
}

export { activateAnalytics };
