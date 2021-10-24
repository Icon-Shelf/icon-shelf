import ua from 'universal-analytics';
import { v4 as uuid } from 'uuid';
import store from './store';

const userId = store.get('userId') || uuid();

store.set('userId', userId);

function activateAnalytics() {
  const user = ua('UA-138326907-3', userId);
  user.pageview('/').send();
}

export { activateAnalytics };
