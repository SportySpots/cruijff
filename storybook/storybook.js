import '../App/prototypes';
import React from 'react';
import { AppRegistry } from 'react-native';
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { ApolloMockProvider } from '../App/GraphQL/ApolloMockClient';
import { loadStories } from './storyLoader';
import { SpotFiltersProvider } from '../App/Context/SpotFilters';

addDecorator(story => (
  <ApolloMockProvider>
    <SpotFiltersProvider>
      <MenuProvider>
        {story()}
      </MenuProvider>
    </SpotFiltersProvider>
  </ApolloMockProvider>
));

// Import stories
configure(loadStories, module);

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
const StorybookUI = getStorybookUI({ port: 7007, onDeviceUI: true });
AppRegistry.registerComponent('SportySpots', () => StorybookUI);

export default StorybookUI;
