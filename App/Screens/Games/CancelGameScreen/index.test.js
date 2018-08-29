import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import CancelGameScreen from '.';
import { navigation, store } from './mocks';
import { WithApolloMockProvider } from '../../../GraphQL';

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
    // const tree = WrappedScreen.toTree().rendered;

    const Screen = WrappedScreen.root.findByType(CancelGameScreen).instance;

    expect(Screen.props).toHaveProperty('navigation', navigation);
    // expect(tree[0].type).toBe(Comp);
    // expect(tree[0].props).toEqual({ num: 1 });
  });
});
