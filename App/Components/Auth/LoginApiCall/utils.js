import ErrorHandling from 'error-handling-utils';

/**
 * errors = {
 *  email: ['This field must be unique.'],
 *  password1: ['This password is too short. It must contain at least 8 characters.']
 * }
*/
const getErrorMsg = (errors) => {
  // { key: 'email', value: 'This field must be unique.' }
  const { key } = ErrorHandling.getFirstError(errors);

  switch (key) {
    case 'email':
    case 'username':
    case 'password1':
    case 'non_field_errors':
      return 'Wrong username or password';
    default:
      return 'Unexpected error';
  }
};

export default getErrorMsg;
