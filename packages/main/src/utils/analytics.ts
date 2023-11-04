const uuid = require('uuid');
import store from './store';

const userId = store.get('userId') || uuid.v4();

store.set('userId', userId);

function activateAnalytics() {

  // user.event('Platform', `${process.platform}`, `${os.release()}`).send();
}

export { activateAnalytics };
