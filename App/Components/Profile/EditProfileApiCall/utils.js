import { curateErrors } from '../../../utils';

/**
 * error = { email: ['This field must be unique.'] }
*/
const curateFieldName = (fieldName) => {
  // switch (fieldName) {
  //   case 'name':
  //     return 'name';
  //   default:
  //     return 'email';
  // }
  // Default all error messages to 'name' field
  return 'name';
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
