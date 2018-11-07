import React from 'react';
import renderer from 'react-test-renderer';

import EditGameScreen from '.';
import { navigation } from './mocks';
import { ApolloMockProvider } from '../../../GraphQL';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';

describe('EditGameScreen', () => {
  it('renders', () => {
    const WrappedScreen = renderer.create(
      <ApolloMockProvider>
        <EditGameScreen
          navigation={navigation}
        />
      </ApolloMockProvider>,
    );
    const Screen = WrappedScreen.root.findByType(EditGameScreen);
    expect(Screen.instance.props).toHaveProperty('navigation', navigation);

    const activityIndicator = Screen.findByType(CenteredActivityIndicator);
    expect(activityIndicator).not.toBeNull();
  });
});
