import isString from 'lodash/isString';

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
  // Assign all error messages to cancelMsg field
  return 'cancelMsg';
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

/**
 * errors = {
 *  email: ['This field must be unique.'],
 *  password1: ['This password is too short. It must contain at least 8 characters.']
 * }
*/
const curateErrors = (errors) => {
  if (isString(errors)) {
    return { [curateFieldName(null)]: [errors] }; // curatedErrors
  }

  if (Array.isArray(errors)) {
    return { [curateFieldName(null)]: errors }; // curatedErrors
  }

  // In case errors is an object
  const keys = Object.keys(errors);
  const curatedErrors = {};

  keys.forEach((key) => {
    const arrayError = errors[key];
    const curatedArray = arrayError.map(errorMsg => (curateErrorMsg(errorMsg)));
    curatedErrors[curateFieldName(key)] = curatedArray;
  });

  return curatedErrors;
};

export default curateErrors;
