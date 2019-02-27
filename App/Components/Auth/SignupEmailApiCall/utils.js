/**
 * error = { email: ['This field must be unique.'] }
*/
const curateFieldName = (fieldName) => {
  switch (fieldName) {
    case 'name':
      return 'name';
    default:
      return 'email';
  }
};

/**
 * error = { email: ['This field must be unique.'] }
*/
const curateErrorMsg = (errorMsg) => {
  console.log('errorMsg', errorMsg);
  switch (errorMsg) {
    case 'This field must be unique.':
      return 'signupEmailForm.fields.email.errors.inUse';
    case 'A user is already registered with this e-mail address.':
      return 'signupEmailForm.fields.email.errors.inUse';
    default:
      return 'signupEmailForm.fields.email.errors.unknown';
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
