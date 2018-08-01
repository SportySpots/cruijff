### Components Folder

All components are stored and organized here

Proposal: a way to organize the components that works for me:

ComponentName/
  |_ index.js // Component's main code
  |_ index.test.js // tests for the main component
  |_ utils.js // utils used in the main components
  |_ stories.js // main component's stories

  |_ ChildComponent1
  |_ ChildComponent2
  ...
  // all child components follow the same structure as the parent component: index.js, index.test.js, etc...
