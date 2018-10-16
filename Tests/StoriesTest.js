import initStoryshots from '@storybook/addon-storyshots';

initStoryshots({
  storyKindRegex: /^((?!.*?(SportDateTimeForm|PlanGameScreen|TimePickerField)).)*$/
});
