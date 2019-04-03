import React from 'react';
import renderer from 'react-test-renderer';
import { ApolloMockProvider } from '../../../GraphQL/ApolloMockClient';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import navigation from './mocks';
import EditGameScreen from '.';

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
