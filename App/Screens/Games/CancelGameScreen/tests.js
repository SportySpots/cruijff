import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import CancelGameScreen from '.';
import { navigation, store } from './mocks';
import { WithApolloMockProvider } from '../../../GraphQL';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';

describe('CancelGameScreen', () => {
  it('renders', () => {
    const WrappedScreen = renderer.create(
      <Provider store={store}>
        <WithApolloMockProvider>
          <CancelGameScreen
            navigation={navigation}
          />
        </WithApolloMockProvider>
      </Provider>,
    );
    const Screen = WrappedScreen.root.findByType(CancelGameScreen);
    expect(Screen.instance.props).toHaveProperty('navigation', navigation);

    const activityIndicator = Screen.findByType(CenteredActivityIndicator);
    expect(activityIndicator).not.toBeNull();
  });
});
