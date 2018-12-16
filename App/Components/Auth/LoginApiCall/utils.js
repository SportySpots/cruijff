/**
 * error = { email: ['This field must be unique.'] }
*/
const curateFieldName = (fieldName) => {
  switch (fieldName) {
    case 'password1':
      return 'password';
    case 'email':
    case 'username':
    case 'non_field_errors':
    default:
      return 'email';
  }
};

/**
 * error = { email: ['This field must be unique.'] }
*/
const curateErrorMsg = (errorMsg) => {
  switch (errorMsg) {
    case 'Unable to log in with provided credentials.':
      return 'loginForm.fields.email.errors.wrongCredentials';
    default:
      return 'loginForm.fields.email.errors.unknown';
  }
};

/**
 * errors = {
 *  email: ['This field must be unique.'],
 *  password1: ['This password is too short. It must contain at least 8 characters.']
 * }
*/
const curateErrors = (errors) => {
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
