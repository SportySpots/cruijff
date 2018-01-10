// import { combineReducers } from 'redux'
import createStore from './CreateStore'
import rootSaga from '../Sagas'
import { persistCombineReducers, persistStore } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'

const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['login', 'search', 'nav'],
  transforms: [immutablePersistenceTransform],
  debug: true
}

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = persistCombineReducers(config, {
    nav: require('./NavigationRedux').reducer,
    github: require('./GithubRedux').reducer,
    search: require('./SearchRedux').reducer,
    location: require('./LocationRedux').reducer,
    facebook: require('./FacebookRedux').reducer
  })

  const store = createStore(rootReducer, rootSaga)
  persistStore(store)

  return store
}
