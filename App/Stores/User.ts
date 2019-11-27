import AsyncStorage from '@react-native-community/async-storage';
import client from '../GraphQL/ApolloClient';
import GET_USER_DETAILS from '../GraphQL/Users/Queries/GET_USER_DETAILS';
import { decodeJWTToken } from '../utils';
import { action, observable } from 'mobx';

/*
  user:
    undefined - not checked yet
    null      - user not logged in
    object    - the current logged in user object
*/
type IUser = object | null | undefined;

export class UserStore {
  @observable loading = true;
  @observable user: null | IUser = undefined;
  @action fetchUser = async () => {
    // Do not set loading state
    try {
      const token = await AsyncStorage.getItem('TOKEN');
      if (!token) {
        this.user = null;
      } else {
        const claims = decodeJWTToken(token);
        console.log('CLAIMS', claims);
        const {email} = claims;

        const res = await client.query({
          fetchPolicy: 'network-only',
          query: GET_USER_DETAILS,
          variables: {email},
        });

        this.user = res.data.user;
      }
    } catch (exc) {
      console.log(exc);
    }
    this.loading = false;
  }

  @action logout = async() => {
    await AsyncStorage.removeItem('TOKEN');
    await this.fetchUser();
  }
}

const store = new UserStore();
store.fetchUser();

export default store;
