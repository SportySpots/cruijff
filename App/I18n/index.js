import I18n from 'i18n-js';

const missingTranslationRegex = /^\[missing ".*" translation\]$/;

// This function is a wrapper to avoid exception wich leads in a crash
const translateOrFallback = (initialMsg, ...rest) => {
  // We tried to translate something else than a string
  // The native I18n function will simply crash instead of rejecting the attempt
  // with an error message
  if (typeof initialMsg !== 'string') {
    if (__DEV__) {
      console.log(`I18n: you must give a string to translate instead of "${typeof initialMsg}"`);
    }
    return ''; // We don't return any message as we don't know what to send
  }

  const localMsg = I18n.t(initialMsg, ...rest);

  // The translation does not exist, the default message is not very sexy
  // Instead we return the message we tried to translate
  if (missingTranslationRegex.test(localMsg)) {
    if (__DEV__) {
      console.log(`translation "${initialMsg}" does not exists in translations files`);
    }
    return initialMsg;
  }

  return localMsg;
};

export default {
  ...I18n,
  t: translateOrFallback,
};
