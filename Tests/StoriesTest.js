import initStoryshots from '@storybook/addon-storyshots';

console.error = (...args) => {
  throw new Error(args);
};

initStoryshots({
  storyKindRegex: /^((?!.*?(SportDateTimeForm|PlanGameScreen|TimePickerField|SportDateTimeSlide)).)*$/,
});
