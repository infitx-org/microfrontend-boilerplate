import React, { FC } from 'react';
import { useReducerLoader } from 'store/hooks';
import { App } from './App';
import reducer from './App/reducer';
import sagas from './App/sagas';

// TODO: investigating better way of injecting reducer at runtime
const AppWithStoreInjector: FC<unknown> = () => {
  let isReducerLoaded = false;
  try {
    isReducerLoaded = useReducerLoader('subApp', reducer, sagas);
  } catch (e) {
    console.log(e);
  }
  return isReducerLoaded ? <App /> : <div>error while loading reducer / sagas</div>;
};

export default AppWithStoreInjector;
