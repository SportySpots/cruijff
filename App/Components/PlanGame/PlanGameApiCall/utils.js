import { curateErrors } from '../../../utils';

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
  // Assign all error messages to title field
  return 'title';
};

/**
 * error = { email: ['This field must be unique.'] }
*/
const curateErrorMsg = (errorMsg) => {
  // switch (errorMsg) {
  //   case 'Unable to log in with provided credentials.':
  //     return 'loginEmailForm.fields.email.errors.wrongCredentials';
  //   default:
  //     return 'loginEmailForm.fields.email.errors.unknown';
  // }
  return errorMsg;
};

export default curateErrors(curateFieldName, curateErrorMsg); // fn
