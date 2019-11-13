import React from 'react';
import { AppRegistry } from 'react-native';
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { ThemeProvider } from 'styled-components/native';
import { SpotFiltersProvider } from '../App/Context/SpotFilters';
import client from '../App/GraphQL/ApolloMockClient';
import { loadStories } from './storyLoader';
import scTheme from '../App/Themes/scTheme';
import {ApolloProvider as ApolloHooksProvider} from "@apollo/react-common";
import {ApolloProvider} from "react-apollo"; // styled-components theme

addDecorator(story => (
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <ThemeProvider theme={scTheme}>
        <SpotFiltersProvider>
          <MenuProvider>
            {story()}
          </MenuProvider>
        </SpotFiltersProvider>
      </ThemeProvider>
    </ApolloHooksProvider>
  </ApolloProvider>
));

// Import stories
configure(loadStories, module);

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
const StorybookUI = getStorybookUI({ port: 7007, onDeviceUI: true });
AppRegistry.registerComponent('SportySpots', () => StorybookUI);

export default StorybookUI;
