import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import moment from 'moment';
import MockDate from 'mockdate';
import I18n from '../../../I18n';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import { ApolloMockProvider, createMockClient } from '../../../GraphQL';
import EditGameForm from '.';

const mockMonth = 10; // november
const mockYear = 2018;
const mockDate = 1;

const validName = 'Football game!';
let validDate;
let validTime;
const validDuration = 120;

describe('EditGameForm', () => {
  let game;

  beforeAll(async () => {
    const mockClient = createMockClient();
    const res = await mockClient.query({
      query: GET_GAME_DETAILS,
      variables: { uuid: 455 },
    });
    game = res.data.game; // eslint-disable-line prefer-destructuring
  });

  beforeEach(() => {
    const mockMoment = moment.utc({
      year: mockYear,
      month: mockMonth,
      date: mockDate,
    });
    MockDate.set(mockMoment.toDate());

    validDate = moment.utc();
    validTime = moment.utc().clone().add(1, 'hours');
  });

  afterEach(() => {
    MockDate.reset();
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(
      <ApolloMockProvider>
        <EditGameForm game={game} />
      </ApolloMockProvider>,
    ).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('renders custom label button', () => {
    const wrapper = shallow(<EditGameForm game={game} />);
    expect(wrapper.find({ testID: 'editGameSubmitButton' }).props().label).toBe(I18n.t('editGameForm.btnLabel'));
  });

  it('errors when form is submitted without name, date, time or duration', () => {
    [
      {
        name: '',
        date: validDate,
        time: validTime,
        duration: validDuration,
        errorFieldID: 'editGameFieldName',
        errorMsg: 'editGameForm.fields.title.errors.required',
      },
      {
        name: validName,
        date: '',
        time: validTime,
        duration: validDuration,
        errorFieldID: 'editGameFieldDate',
        errorMsg: 'editGameForm.fields.date.errors.required',
      },
      {
        name: validName,
        date: validDate,
        time: '',
        duration: validDuration,
        errorFieldID: 'editGameFieldTime',
        errorMsg: 'editGameForm.fields.time.errors.required',
      },
      {
        name: validName,
        date: validDate,
        time: validTime,
        duration: '',
        errorFieldID: 'editGameFieldDuration',
        errorMsg: 'editGameForm.fields.duration.errors.required',
      },
    ].forEach(({
      name,
      date,
      time,
      duration,
      errorFieldID,
      errorMsg,
    }) => {
      const handleClientError = jest.fn();
      const wrapper = shallow(
        <EditGameForm
          game={game}
          onClientErrorHook={handleClientError}
        />,
      );

      // Sanity check
      expect(wrapper.find({ testID: 'editGameFieldName' }).props().value).not.toBeNull();
      expect(wrapper.find({ testID: 'editGameFieldDate' }).props().value).not.toBeNull();
      expect(wrapper.find({ testID: 'editGameFieldTime' }).props().value).not.toBeNull();
      expect(wrapper.find({ testID: 'editGameFieldDuration' }).props().value).not.toBeNull();

      wrapper.find({ testID: 'editGameFieldName' }).props().onChangeText(name);
      wrapper.find({ testID: 'editGameFieldDate' }).props().onChange(date);
      wrapper.find({ testID: 'editGameFieldTime' }).props().onChange(time);
      wrapper.find({ testID: 'editGameFieldDuration' }).props().onChange(duration);

      wrapper.find({ testID: 'editGameSubmitButton' }).props().onPress();

      expect(wrapper.find({ testID: errorFieldID }).props().error).toBe(I18n.t(errorMsg));
      expect(handleClientError).toBeCalled();
    });
  });

  it('errors when form is submitted with past date-time', () => {
    const handleClientError = jest.fn();
    const wrapper = shallow(
      <EditGameForm
        game={game}
        onClientErrorHook={handleClientError}
      />,
    );

    // Sanity check
    expect(wrapper.find({ testID: 'editGameFieldDate' }).props().value).not.toBeNull();
    expect(wrapper.find({ testID: 'editGameFieldTime' }).props().value).not.toBeNull();

    wrapper.find({ testID: 'editGameFieldDate' }).props().onChange(validDate.clone().subtract(1, 'days'));
    wrapper.find({ testID: 'editGameFieldTime' }).props().onChange(validTime);
    wrapper.find({ testID: 'editGameSubmitButton' }).props().onPress();

    expect(wrapper.find({ testID: 'editGameFieldTime' }).props().error).toBe(I18n.t('editGameForm.fields.time.errors.pastDateTime'));
    expect(handleClientError).toBeCalled();
  });

  it('clears errors when name, date, time or duration input field is modified after error', () => {
    [
      {
        name: '',
        validField: validName,
        date: validDate,
        time: validTime,
        duration: validDuration,
        errorFieldID: 'editGameFieldName',
        errorMsg: 'editGameForm.fields.title.errors.required',
      },
      {
        name: validName,
        date: '',
        validField: validDate,
        time: validTime,
        duration: validDuration,
        errorFieldID: 'editGameFieldDate',
        errorMsg: 'editGameForm.fields.date.errors.required',
      },
      {
        name: validName,
        date: validDate,
        time: '',
        validField: validTime,
        duration: validDuration,
        errorFieldID: 'editGameFieldTime',
        errorMsg: 'editGameForm.fields.time.errors.required',
      },
      {
        name: validName,
        date: validDate,
        time: validTime,
        duration: '',
        validField: validDuration,
        errorFieldID: 'editGameFieldDuration',
        errorMsg: 'editGameForm.fields.duration.errors.required',
      },
    ].forEach(({
      name,
      date,
      time,
      duration,
      validField,
      errorFieldID,
      errorMsg,
    }) => {
      const handleClientError = jest.fn();
      const wrapper = shallow(
        <EditGameForm
          game={game}
          onClientErrorHook={handleClientError}
        />,
      );

      // Sanity check
      expect(wrapper.find({ testID: 'editGameFieldName' }).props().value).not.toBeNull();
      expect(wrapper.find({ testID: 'editGameFieldDate' }).props().value).not.toBeNull();
      expect(wrapper.find({ testID: 'editGameFieldTime' }).props().value).not.toBeNull();
      expect(wrapper.find({ testID: 'editGameFieldDuration' }).props().value).not.toBeNull();

      wrapper.find({ testID: 'editGameFieldName' }).props().onChangeText(name);
      wrapper.find({ testID: 'editGameFieldDate' }).props().onChange(date);
      wrapper.find({ testID: 'editGameFieldTime' }).props().onChange(time);
      wrapper.find({ testID: 'editGameFieldDuration' }).props().onChange(duration);


      wrapper.find({ testID: 'editGameSubmitButton' }).props().onPress();

      expect(wrapper.find({ testID: errorFieldID }).props().error).toBe(I18n.t(errorMsg));
      expect(handleClientError).toBeCalled();

      if (errorFieldID === 'editGameFieldName') {
        wrapper.find({ testID: errorFieldID }).props().onChangeText(validField);
      } else {
        wrapper.find({ testID: errorFieldID }).props().onChange(validField);
      }

      wrapper.find({ testID: 'editGameSubmitButton' }).props().onPress();

      expect(wrapper.find({ testID: errorFieldID }).props().error).toBe('');
    });
  });

  it('aborts form submission if onBeforeHook throws', () => {
    const handleBefore = jest.fn().mockImplementation(() => { throw new Error(); });
    const handleClientCancel = jest.fn();
    const handleSuccess = jest.fn();

    const wrapper = shallow(
      <EditGameForm
        onBeforeHook={handleBefore}
        onClientCancelHook={handleClientCancel}
        onSuccessHook={handleSuccess}
      />,
    );

    // Sanity check
    expect(wrapper.find({ testID: 'editGameFieldName' }).props().value).not.toBeNull();
    expect(wrapper.find({ testID: 'editGameFieldDate' }).props().value).not.toBeNull();
    expect(wrapper.find({ testID: 'editGameFieldTime' }).props().value).not.toBeNull();
    expect(wrapper.find({ testID: 'editGameFieldDuration' }).props().value).not.toBeNull();

    wrapper.find({ testID: 'editGameFieldName' }).props().onChangeText(validName);
    wrapper.find({ testID: 'editGameFieldDate' }).props().onChange(validDate);
    wrapper.find({ testID: 'editGameFieldTime' }).props().onChange(validTime);
    wrapper.find({ testID: 'editGameFieldDuration' }).props().onChange(validDuration);

    wrapper.find({ testID: 'editGameSubmitButton' }).props().onPress();

    expect(handleBefore).toBeCalled();
    expect(handleClientCancel).toBeCalled();
    expect(handleSuccess).not.toBeCalled();
  });

  it('calls onSuccessHook when valid name, date, time and duration are provided', () => {
    const handleBefore = jest.fn();
    const handleClientCancel = jest.fn();
    const handleClientError = jest.fn();
    const handleSuccess = jest.fn();

    const wrapper = shallow(
      <EditGameForm
        game={game}
        onBeforeHook={handleBefore}
        onClientCancelHook={handleClientCancel}
        onClientErrorHook={handleClientError}
        onSuccessHook={handleSuccess}
      />,
    );

    // Sanity check
    expect(wrapper.find({ testID: 'editGameFieldName' }).props().value).not.toBeNull();
    expect(wrapper.find({ testID: 'editGameFieldDate' }).props().value).not.toBeNull();
    expect(wrapper.find({ testID: 'editGameFieldTime' }).props().value).not.toBeNull();
    expect(wrapper.find({ testID: 'editGameFieldDuration' }).props().value).not.toBeNull();

    wrapper.find({ testID: 'editGameFieldName' }).props().onChangeText(validName);
    wrapper.find({ testID: 'editGameFieldDate' }).props().onChange(validDate);
    wrapper.find({ testID: 'editGameFieldTime' }).props().onChange(validTime);
    wrapper.find({ testID: 'editGameFieldDuration' }).props().onChange(validDuration);

    expect(wrapper.state().name).toBe(validName);
    expect(wrapper.state().date).toBe(validDate);
    expect(wrapper.state().time).toBe(validTime);
    expect(wrapper.state().duration).toBe(validDuration);

    wrapper.find({ testID: 'editGameSubmitButton' }).props().onPress();

    expect(handleBefore).toBeCalled();
    expect(handleClientCancel).not.toBeCalled();
    expect(handleSuccess).toBeCalledWith(
      expect.objectContaining({
        name: validName,
        date: validDate,
        time: validTime,
        duration: validDuration,
      }),
    );
  });
});
