import { curateErrors as ce } from '../../../utils';

/**
 * error = { email: ['This field must be unique.'] }
*/
const curateFieldName = (fieldName) => {
  // switch (fieldName) {
  //   case 'password1':
  //     return 'password';
  //   case 'email':
  //   case 'username':
  //   case 'non_field_errors':
  //   default:
  //     return 'email';
  // }
  return 'email';
};

/**
 * error = { email: ['This field must be unique.'] }
*/
const curateErrorMsg = (errorMsg) => {
  console.log('errorMsg', errorMsg);
  switch (errorMsg) {
    case 'Unable to log in with provided credentials.':
      return 'loginEmailForm.fields.email.errors.wrongCredentials';
    case 'Email not registered':
      return 'loginEmailForm.fields.email.errors.notRegistered';
    default:
      return 'loginEmailForm.fields.email.errors.unknown';
  }
};

const curateErrors = ce(curateFieldName, curateErrorMsg);

export default curateErrors;
