import initStoryshots from '@storybook/addon-storyshots';

console.error = (...args) => {
  throw new Error(args);
};

console.warn = (...args) => {
  throw new Error(args);
};

initStoryshots({
  // storyKindRegex: /^((?!.*?(PlanGameScreen|TimePickerField|SportDateTimeSlide|LocationSlide|OnboardingForm|OnboardingScreen)).)*$/,
});
