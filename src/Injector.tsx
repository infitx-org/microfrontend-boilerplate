import React from 'react';
import { Provider } from 'react-redux';
import configureStore, { ReduxContext } from './store';
import App from './App';
import { actions, AuthConfig } from './App/Config';

type Callback = (message: string) => void;

type Unsubscribe = () => void;

type PubSub = {
  subscribe: (channel: string, callback: Callback) => Unsubscribe;
  dispatch: (channel: string, message: string) => void;
};

interface ExportAppProps {
  token?: string;
  authConfig?: AuthConfig;
  pubSub: PubSub;
}

const store = configureStore(null, {
  isDevelopment: process.env.NODE_ENV === 'development',
});

export default function ExportApp({ token, authConfig, pubSub }: ExportAppProps) {
  if (authConfig) {
    store.dispatch(actions.setConfig(authConfig));
  }

  const unsubChannelA0 = pubSub.subscribe('channel-A', () => {
    store.dispatch(actions.increaseCounter());
  });
  const unsubChannelA1 = pubSub.subscribe('channel-A', () => {
    store.dispatch(actions.increaseCounter());
  });
  const unsubChannelB0 = pubSub.subscribe('channel-B', () => {
    store.dispatch(actions.increaseCounter());
  });

  setTimeout(() => {
    unsubChannelA0();
    unsubChannelA1();
    unsubChannelB0();

    // eslint-disable-next-line
    console.log('unsubscribed');
  }, 1000);

  return (
    <Provider store={store} context={ReduxContext}>
      <App token={token} />
    </Provider>
  );
}
