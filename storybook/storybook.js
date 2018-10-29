import React from 'react';
import { AppRegistry } from 'react-native';
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { WithApolloMockProvider } from '../App/GraphQL';
import { loadStories } from './storyLoader';
import ReduxMockProvider from '../App/Redux/ReduxMockProvider';

/* addDecorator(story => (
  <WithApolloMockProvider>
    <ReduxMockProvider>
      <MenuProvider>
        {story()}
      </MenuProvider>
    </ReduxMockProvider>
  </WithApolloMockProvider>
)); */

// Import stories
configure(loadStories, module);

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
const StorybookUI = getStorybookUI({ port: 7007, onDeviceUI: true });
AppRegistry.registerComponent('SportySpots', () => StorybookUI);

export default StorybookUI;

