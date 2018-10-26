import ErrorHandling from 'error-handling-utils';

/**
 * errors = {
 *  email: ['This field must be unique.'],
 *  password1: ['This password is too short. It must contain at least 8 characters.']
 * }
*/
const getErrorMsg = (errors) => {
  // { key: 'email', value: 'This field must be unique.' }
  const { key, value } = ErrorHandling.getFirstError(errors);

  switch (key) {
    case 'email':
    case 'username':
      if (value === 'This field must be unique.') {
        return 'E-mail address in use';
      }
      return 'Enter a valid e-mail address';
    case 'password1':
      if (value === 'This password is too short. It must contain at least 8 characters.') {
        return 'Password needs to be at least 8 characters';
      }
      if (value === 'This password is too common.') {
        return 'This password is too common.';
      }
      if (value === 'This password is entirely numeric.') {
        return 'This password is entirely numeric.';
      }
      return 'Enter a valid password';
    default:
      return 'Unexpected error';
  }
};

export default getErrorMsg;
