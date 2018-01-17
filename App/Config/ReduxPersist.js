import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'
import { AsyncStorage } from 'react-native'

// More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
const REDUX_PERSIST = {
  active: false,
  reducerVersion: '1.1',
  config: {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['login', 'search', 'nav'],
    transforms: [immutablePersistenceTransform],
    debug: true
  }
}

export default REDUX_PERSIST
