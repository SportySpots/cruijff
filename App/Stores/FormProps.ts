// import { action, observable } from 'mobx';
//
// export class FormPropsStore {
//   disabled: disabledProps.disabled,
//   errors: errorProps.errors,
//   setErrors: errorProps.setErrors,
//   clearErrors: errorProps.clearErrors,
//   handleBefore: hookProps.handleBefore,
//   handleClientCancel: hookProps.handleClientCancel,
//   handleClientError: hookProps.handleClientError,
//   handleServerError: hookProps.handleServerError,
//   handleSuccess: hookProps.handleSuccess,
//
//
//   @observable loading = true;
//   @observable user: null | IUser = undefined;
//   @action fetchUser = async () => {
//     // Do not set loading state
//     try {
//       const token = await AsyncStorage.getItem('TOKEN');
//       if (!token) {
//         this.user = null;
//       } else {
//         const claims = decodeJWTToken(token);
//         console.log('CLAIMS', claims);
//         const {email} = claims;
//
//         const res = await client.query({
//           fetchPolicy: 'network-only',
//           query: GET_USER_DETAILS,
//           variables: {email},
//         });
//
//         this.user = res.data.user;
//       }
//     } catch (exc) {
//       console.log(exc);
//     }
//     this.loading = false;
//   }
//
//   @action logout = async() => {
//     await AsyncStorage.removeItem('TOKEN');
//     await this.fetchUser();
//   }
// }
//
// const store = new UserStore();
// store.fetchUser();
//
// export default store;
