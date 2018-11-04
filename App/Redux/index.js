import { combineReducers } from 'redux';
import rootSaga from '../Sagas/';
import configureStore from './CreateStore';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  user: require('./UserRedux').reducer,
  spotFilters: require('./SpotFiltersRedux').reducer,
});

export let reduxStore = null;

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(reducers, rootSaga);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require('../Sagas').default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas);
      });
    });
  }
  reduxStore = store;
  return store;
};
