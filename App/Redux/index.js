import createStore from './CreateStore'
import rootSaga from '../Sagas'
import { persistCombineReducers, persistStore } from 'redux-persist'
import REDUX_PERSIST from '../Config/ReduxPersist'
import { combineReducers } from 'redux'

export default () => {
  const combiner = REDUX_PERSIST.active ? combineReducers : persistCombineReducers

  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combiner(REDUX_PERSIST.config, {
    nav: require('./NavigationRedux').reducer,
    github: require('./GithubRedux').reducer,
    search: require('./SearchRedux').reducer,
    location: require('./LocationRedux').reducer,
    facebook: require('./FacebookRedux').reducer,
    api: require('./APIRedux').reducer
  })

  const store = createStore(rootReducer, rootSaga)
  if (REDUX_PERSIST.active) { persistStore(store) }

  console.log('store', store.getState())

  return store
}
