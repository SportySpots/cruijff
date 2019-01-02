import isString from 'lodash/isString';

function toTitleCase(str) {
  // If the string is not provided, and if it's called directly
  // on the string, we can access the text via 'this'
  if (!str) { str = this; } // eslint-disable-line

  if (!isString(str)) {
    return '';
  }

  return str.toLowerCase()
    .split(' ')
    .map(s => (s.charAt(0).toUpperCase() + s.substring(1)))
    .join(' ');
}

String.prototype.toTitleCase = toTitleCase; // eslint-disable-line no-extend-native
