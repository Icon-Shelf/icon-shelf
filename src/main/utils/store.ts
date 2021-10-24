import Store from 'electron-store';

type StoreProps = {
  userId: string;
};

const store = new Store<StoreProps>();

export default store;
