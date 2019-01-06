import React from 'react';
import { shallow } from 'enzyme';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import { createMockClient } from '../../../GraphQL';
import CancelGameForm from '.';

describe('CancelGameForm', () => {
  let game;

  beforeAll(async () => {
    const mockClient = createMockClient();
    const res = await mockClient.query({
      query: GET_GAME_DETAILS,
      variables: { uuid: 455 },
    });
    game = res.data.game; // eslint-disable-line prefer-destructuring
  });

  it('aborts form submission if onBeforeHook throws', () => {
    const handleBefore = jest.fn().mockImplementation(() => { throw new Error(); });
    const handleClientCancel = jest.fn();
    const handleSuccess = jest.fn();

    const wrapper = shallow(
      <CancelGameForm
        game={game}
        onBeforeHook={handleBefore}
        onClientCancelHook={handleClientCancel}
        onSuccessHook={handleSuccess}
      />,
    );

    expect(wrapper.find('RaisedButton')).toHaveLength(1);
    wrapper.find('RaisedButton').first().props().onPress();

    expect(handleBefore).toBeCalled();
    expect(handleClientCancel).toBeCalled();
    expect(handleSuccess).not.toBeCalled();
  });

  it('calls onErrorHook when cancelMsg.length > MAX_CHARS', () => {});

  it('calls onSuccessHook when no cancelMsg or cancelMsg.length <= MAX_CHARS is provided', () => {});
});
