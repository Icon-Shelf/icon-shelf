const ua = require('universal-analytics');
const uuid = require('uuid');
import store from './store';

const userId = store.get('userId') || uuid.v4();

store.set('userId', userId);

function activateAnalytics() {
  const user = ua('UA-138326907-3', userId);

  user.pageview('/').send();

  user.event('platform-os', 'platform-os', 'Platform OS', process.platform || 'none').send();
}

export { activateAnalytics };
