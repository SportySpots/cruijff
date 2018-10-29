import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import EditGameScreen from '.';
import { navigation, store } from './mocks';
import { ApolloMockProvider } from '../../../GraphQL';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';

describe('EditGameScreen', () => {
  it('renders', () => {
    const WrappedScreen = renderer.create(
      <Provider store={store}>
        <ApolloMockProvider>
          <EditGameScreen
            navigation={navigation}
          />
        </ApolloMockProvider>
      </Provider>,
    );
    const Screen = WrappedScreen.root.findByType(EditGameScreen);
    expect(Screen.instance.props).toHaveProperty('navigation', navigation);

    const activityIndicator = Screen.findByType(CenteredActivityIndicator);
    expect(activityIndicator).not.toBeNull();
  });
});
