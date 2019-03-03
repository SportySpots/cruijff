import { curateErrors } from '../../../utils';

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
  switch (errorMsg) {
    case 'This field must be unique.':
      return 'signupEmailForm.fields.email.errors.inUse';
    case 'A user is already registered with this e-mail address.':
      return 'signupEmailForm.fields.email.errors.inUse';
    default:
      return 'signupEmailForm.fields.email.errors.unknown';
  }
};

export default curateErrors(curateFieldName, curateErrorMsg); // fn
