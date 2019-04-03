import React from 'react';
import renderer from 'react-test-renderer';

import CancelGameScreen from '.';
import { navigation } from './mocks';
import { ApolloMockProvider } from '../../../GraphQL/ApolloMockClient';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';

describe('CancelGameScreen', () => {
  it('renders', () => {
    const WrappedScreen = renderer.create(
      <ApolloMockProvider>
        <CancelGameScreen
          navigation={navigation}
        />
      </ApolloMockProvider>,
    );
    const Screen = WrappedScreen.root.findByType(CancelGameScreen);
    expect(Screen.instance.props).toHaveProperty('navigation', navigation);

    const activityIndicator = Screen.findByType(CenteredActivityIndicator);
    expect(activityIndicator).not.toBeNull();
  });
});
