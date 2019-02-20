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

const attendee = {
  uuid: 'fb98ffd9-bd20-49f8-9157-fd00d1d6794d',
  status: 'ATTENDING',
  user: {
    id: 'e77d5276-8617-4757-b785-cd1e5e12277b',
    uuid: 'c9782deb-e573-4da6-9a16-6883eff43182',
    name: 'Hello World',
    profile: {
      id: '5c8b7c10-6925-49e1-92ec-5357b3fad244',
      uuid: '853d033b-349c-4468-8650-3dc74fb0b232',
      avatar: 'Hello World',
      __typename: 'UserProfileType',
    },
    __typename: 'UserType',
  },
  __typename: 'RsvpStatusType',
};

describe('CancelGameForm', () => {
  let game;

  beforeAll(async () => {
    const mockClient = createMockClient();
    const res = await mockClient.query({
      query: GET_GAME_DETAILS,
      variables: { uuid: 455 },
    });
    game = res.data.game; // eslint-disable-line prefer-destructuring
    // Make sure there is at least one attendee
    game.attendees.push(attendee);
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

    // Sanity check
    expect(wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).props().value).toBe('');

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

    // Sanity check
    expect(wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).props().value).toBe('');

    wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).props().onChangeText(invalidCancelMsg);

    wrapper.find({ testID: 'cancelGameFormSubmitButton' }).props().onPress();

    expect(wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).props().error).toBe(I18n.t('cancelGameForm.fields.cancelMsg.errors.tooLong'));
    expect(handleClientError).toBeCalled();
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

      // Sanity check
      expect(wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).props().value).toBe('');

      wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).props().onChangeText(cancelMsg);

      expect(wrapper.state().cancelMsg).toBe(cancelMsg);
      wrapper.find({ testID: 'cancelGameFormSubmitButton' }).props().onPress();

      expect(Alert.alert).toHaveBeenCalled();
      Alert.alert.mock.calls[0][2][1].onPress(); // simulate OK btn press

      expect(handleBefore).toBeCalled();
      expect(handleClientCancel).not.toBeCalled();
      expect(handleSuccess).toBeCalledWith(expect.objectContaining({
        gameUUID: game.uuid,
        cancelMsg,
      }));

      Alert.alert.mockClear();
    });
  });

  it('calls onClientCancelHook when user dismisses confirmation modal', () => {
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

      // Sanity check
      expect(wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).props().value).toBe('');

      wrapper.find({ testID: 'cancelGameFormCancelMsgField' }).props().onChangeText(cancelMsg);

      expect(wrapper.state().cancelMsg).toBe(cancelMsg);
      wrapper.find({ testID: 'cancelGameFormSubmitButton' }).props().onPress();

      expect(Alert.alert).toHaveBeenCalled();
      Alert.alert.mock.calls[0][2][0].onPress(); // simulate CANCEL btn press

      expect(handleBefore).toBeCalled();
      expect(handleClientCancel).toBeCalled();
      expect(handleSuccess).not.toBeCalled();

      Alert.alert.mockClear();
    });
  });
});
