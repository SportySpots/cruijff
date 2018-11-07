import React from 'react';
import { AppRegistry } from 'react-native';
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { ApolloMockProvider } from '../App/GraphQL';
import { loadStories } from './storyLoader';
import { UserProvider } from '../App/Context/User';

const mockUser = {
  uuid: '12345',
  profile: {
    first_name: 'Mock',
    last_name: 'User',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Abraham_de_Vries_-_Portret_van_een_onbekende_man%2C_mogelijk_de_koopman_Adriaen_van_der_Tock_%281584-85-1661%29_-_10539_A_B_-_Museum_Rotterdam.jpg',
  },
};

addDecorator(story => (
  <ApolloMockProvider>
    <UserProvider mockUser={mockUser}>
      <MenuProvider>
        {story()}
      </MenuProvider>
    </UserProvider>
  </ApolloMockProvider>
));

// Import stories
configure(loadStories, module);

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
const StorybookUI = getStorybookUI({ port: 7007, onDeviceUI: true });
AppRegistry.registerComponent('SportySpots', () => StorybookUI);

export default StorybookUI;

