import React from 'react';
import { shallow } from 'enzyme';
import { Alert } from 'react-native';
import renderer from 'react-test-renderer';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import { createMockClient } from '../../../GraphQL';
import I18n from '../../../I18n';
import CancelGameForm, { MAX_CHARS } from '.';

const validCancelMsg = new Array(MAX_CHARS + 1).join('a'); // aaaaaa... length = MAX_CHARS
const invalidCancelMsg = new Array(MAX_CHARS + 2).join('a'); // aaaaaa... length = MAX_CHARS + 1

describe('CancelGameForm', () => {
  let game;

  beforeAll(async () => {
    const mockClient = createMockClient();
    const res = await mockClient.query({
      query: GET_GAME_DETAILS,
      variables: { uuid: 455 },
    });
    game = res.data.game; // eslint-disable-line prefer-destructuring
    console.log('game', game && game.attendees);
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(<CancelGameForm game={game} />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('renders custom label button', () => {
    const wrapper = shallow(<CancelGameForm game={game} />);
    expect(wrapper.find({ testID: 'cancelGameFormSubmitButton' }).props().label).toBe(I18n.t('cancelGameForm.btnLabel'));
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

    // cancelGameFormCancelMsgField is only render when attendees.length > 0
    if (wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).length > 0) {
      console.log('WITH ATTENDEES!!!');
      // Sanity check
      expect(wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).props().value).toBe('');
    } else {
      console.log('NO ATTENDEES!!!');
    }

    wrapper.find({ testID: 'cancelGameFormSubmitButton' }).props().onPress();

    expect(handleBefore).toBeCalled();
    expect(handleClientCancel).toBeCalled();
    expect(handleSuccess).not.toBeCalled();
  });

  it('errors when cancelMsg longer than MAX_CHARS', () => {
    const handleClientError = jest.fn();
    const wrapper = shallow(
      <CancelGameForm
        game={game}
        onClientErrorHook={handleClientError}
      />,
    );

    // cancelGameFormCancelMsgField is only render when attendees.length > 0
    if (wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).length > 0) {
      console.log('WITH ATTENDEES!!!');
      // Sanity check
      expect(wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).props().value).toBe('');

      wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).props().onChangeText(invalidCancelMsg);

      wrapper.find({ testID: 'cancelGameFormSubmitButton' }).props().onPress();

      expect(wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).props().error).toBe(I18n.t('cancelGameForm.fields.cancelMsg.errors.tooLong'));
      expect(handleClientError).toBeCalled();
    } else {
      console.log('NO ATTENDEES!!!');
    }
  });

  it('calls onSuccessHook when no cancelMsg or cancelMsg.length <= MAX_CHARS is provided', () => {
    ['', validCancelMsg].forEach((cancelMsg) => {
      jest.mock('Alert', () => ({ alert: jest.fn() }));
      const handleBefore = jest.fn();
      const handleClientCancel = jest.fn();
      const handleClientError = jest.fn();
      const handleSuccess = jest.fn();

      const wrapper = shallow(
        <CancelGameForm
          game={game}
          onBeforeHook={handleBefore}
          onClientCancelHook={handleClientCancel}
          onClientErrorHook={handleClientError}
          onSuccessHook={handleSuccess}
        />,
      );

      // cancelGameFormCancelMsgField is only render when attendees.length > 0
      if (wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).length > 0) {
        console.log('WITH ATTENDEES!!!');
        // Sanity check
        expect(wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).props().value).toBe('');

        wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).props().onChangeText(cancelMsg);

        expect(wrapper.state().cancelMsg).toBe(cancelMsg);
        wrapper.find({ testID: 'cancelGameFormSubmitButton' }).props().onPress();

        expect(Alert.alert).toHaveBeenCalled();
        Alert.alert.mock.calls[0][2][1].onPress(); // simulate OK btn press

        expect(handleBefore).toBeCalled();
        expect(handleClientCancel).not.toBeCalled();
        expect(handleSuccess).toBeCalledWith(expect.objectContaining({ cancelMsg }));
      } else {
        console.log('NO ATTENDEES!!!');
      }

      Alert.alert.mockClear();
    });
  });
});
