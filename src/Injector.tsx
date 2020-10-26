import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Store, combineReducers } from 'redux';
import { useReducerLoader } from '@modusbox/modusbox-ui-components/dist/redux/hooks';
import { App } from './App';
import { reducers } from './App/reducer';
import sagas from './App/sagas';

interface AppWithStoreInjectorProps {
  token?: string;
}

const AppWithStoreInjector: FC<AppWithStoreInjectorProps> = ({ token }) => {
  const store: Store | false = useReducerLoader(combineReducers(reducers), sagas);

  if (store === false) {
    return <div>error while loading reducer / sagas</div>;
  }

  return (
    <Provider store={store as Store}>
      <App token={token} />
    </Provider>
  );
};

export default AppWithStoreInjector;
