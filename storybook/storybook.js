import React from 'react';
import { AppRegistry } from 'react-native';
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { ApolloMockProvider } from '../App/GraphQL';
import { loadStories } from './storyLoader';
import MockUserProvider from '../App/Context/MockUser';

addDecorator(story => (
  <ApolloMockProvider>
    <MockUserProvider>
      <MenuProvider>
        {story()}
      </MenuProvider>
    </MockUserProvider>
  </ApolloMockProvider>
));

// Import stories
configure(loadStories, module);

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
const StorybookUI = getStorybookUI({ port: 7007, onDeviceUI: true });
AppRegistry.registerComponent('SportySpots', () => StorybookUI);

export default StorybookUI;
