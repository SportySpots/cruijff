import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
// import moment from 'moment';
// import MockDate from 'mockdate';
import I18n from '../../../I18n';
import GET_USER_DETAILS from '../../../GraphQL/Users/Queries/GET_USER_DETAILS';
import { ApolloMockProvider, createMockClient } from '../../../GraphQL';
import EditProfileForm, { MAX_CHARS } from '.';

const validFirstName = 'John';
const validLastName = 'Doe';
const longFirstName = new Array(MAX_CHARS + 2).join('a'); // aaaaaa... length = MAX_CHARS + 1
const longLastName = new Array(MAX_CHARS + 2).join('a'); // aaaaaa... length = MAX_CHARS + 1

describe('EditProfileForm', () => {
  let user;

  beforeAll(async () => {
    const mockClient = createMockClient();
    const res = await mockClient.query({
      query: GET_USER_DETAILS,
      variables: { uuid: 455 },
    });
    user = res.data.user; // eslint-disable-line prefer-destructuring
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(
      <ApolloMockProvider>
        <EditProfileForm user={user} />
      </ApolloMockProvider>,
    ).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('renders custom label button', () => {
    const wrapper = shallow(<EditProfileForm user={user} />);
    expect(wrapper.find({ testID: 'editProfileSubmitButton' }).props().label).toBe(I18n.t('editProfileForm.btnLabel'));
  });

  it('errors when form is submitted without firstName or lastName', () => {
    [
      {
        firstName: '',
        lastName: validLastName,
        errorFieldID: 'editProfileFieldFirstName',
        errorMsg: 'editProfileForm.fields.firstName.errors.required',
      },
      {
        firstName: validFirstName,
        lastName: '',
        errorFieldID: 'editProfileFieldLastName',
        errorMsg: 'editProfileForm.fields.lastName.errors.required',
      },
    ].forEach(({
      firstName,
      lastName,
      errorFieldID,
      errorMsg,
    }) => {
      const handleClientError = jest.fn();
      const wrapper = shallow(
        <EditProfileForm
          user={user}
          onClientErrorHook={handleClientError}
        />,
      );

      // Sanity check
      expect(wrapper.find({ testID: 'editProfileFieldFirstName' }).props().value).not.toBeNull();
      expect(wrapper.find({ testID: 'editProfileFieldLastName' }).props().value).not.toBeNull();

      wrapper.find({ testID: 'editProfileFieldFirstName' }).props().onChangeText(firstName);
      wrapper.find({ testID: 'editProfileFieldLastName' }).props().onChangeText(lastName);

      wrapper.find({ testID: 'editProfileSubmitButton' }).props().onPress();

      expect(wrapper.find({ testID: errorFieldID }).props().error).toBe(I18n.t(errorMsg));
      expect(handleClientError).toBeCalled();
    });
  });

  it('errors when form is submitted with firstName or lastName length > MAX_CHARS', () => {
    [
      {
        firstName: longFirstName,
        lastName: validLastName,
        errorFieldID: 'editProfileFieldFirstName',
        errorMsg: 'editProfileForm.fields.firstName.errors.tooLong',
      },
      {
        firstName: validFirstName,
        lastName: longLastName,
        errorFieldID: 'editProfileFieldLastName',
        errorMsg: 'editProfileForm.fields.lastName.errors.tooLong',
      },
    ].forEach(({
      firstName,
      lastName,
      errorFieldID,
      errorMsg,
    }) => {
      const handleClientError = jest.fn();
      const wrapper = shallow(
        <EditProfileForm
          user={user}
          onClientErrorHook={handleClientError}
        />,
      );

      // Sanity check
      expect(wrapper.find({ testID: 'editProfileFieldFirstName' }).props().value).not.toBeNull();
      expect(wrapper.find({ testID: 'editProfileFieldLastName' }).props().value).not.toBeNull();

      wrapper.find({ testID: 'editProfileFieldFirstName' }).props().onChangeText(firstName);
      wrapper.find({ testID: 'editProfileFieldLastName' }).props().onChangeText(lastName);

      wrapper.find({ testID: 'editProfileSubmitButton' }).props().onPress();

      expect(wrapper.find({ testID: errorFieldID }).props().error).toBe(I18n.t(errorMsg));
      expect(handleClientError).toBeCalled();
    });
  });

  it('clears errors when firstName or lastName input field is modified after error', () => {
    [
      {
        firstName: '',
        validField: validFirstName,
        lastName: validLastName,
        errorFieldID: 'editProfileFieldFirstName',
        errorMsg: 'editProfileForm.fields.firstName.errors.required',
      },
      {
        firstName: validFirstName,
        lastName: '',
        validField: validLastName,
        errorFieldID: 'editProfileFieldLastName',
        errorMsg: 'editProfileForm.fields.lastName.errors.required',
      },
    ].forEach(({
      firstName,
      lastName,
      errorFieldID,
      errorMsg,
      validField,
    }) => {
      const handleClientError = jest.fn();
      const wrapper = shallow(
        <EditProfileForm
          user={user}
          onClientErrorHook={handleClientError}
        />,
      );

      // Sanity check
      expect(wrapper.find({ testID: 'editProfileFieldFirstName' }).props().value).not.toBeNull();
      expect(wrapper.find({ testID: 'editProfileFieldLastName' }).props().value).not.toBeNull();

      wrapper.find({ testID: 'editProfileFieldFirstName' }).props().onChangeText(firstName);
      wrapper.find({ testID: 'editProfileFieldLastName' }).props().onChangeText(lastName);

      wrapper.find({ testID: 'editProfileSubmitButton' }).props().onPress();

      expect(wrapper.find({ testID: errorFieldID }).props().error).toBe(I18n.t(errorMsg));
      expect(handleClientError).toBeCalled();

      wrapper.find({ testID: errorFieldID }).props().onChangeText(validField);
      wrapper.find({ testID: 'editProfileSubmitButton' }).props().onPress();

      expect(wrapper.find({ testID: errorFieldID }).props().error).toBe('');
    });
  });

  it('aborts form submission if onBeforeHook throws', () => {
    const handleBefore = jest.fn().mockImplementation(() => { throw new Error(); });
    const handleClientCancel = jest.fn();
    const handleSuccess = jest.fn();

    const wrapper = shallow(
      <EditProfileForm
        user={user}
        onBeforeHook={handleBefore}
        onClientCancelHook={handleClientCancel}
        onSuccessHook={handleSuccess}
      />,
    );

    // Sanity check
    expect(wrapper.find({ testID: 'editProfileFieldFirstName' }).props().value).not.toBeNull();
    expect(wrapper.find({ testID: 'editProfileFieldLastName' }).props().value).not.toBeNull();

    wrapper.find({ testID: 'editProfileFieldFirstName' }).props().onChangeText(validFirstName);
    wrapper.find({ testID: 'editProfileFieldLastName' }).props().onChangeText(validLastName);

    wrapper.find({ testID: 'editProfileSubmitButton' }).props().onPress();

    expect(handleBefore).toBeCalled();
    expect(handleClientCancel).toBeCalled();
    expect(handleSuccess).not.toBeCalled();
  });

  it('calls onSuccessHook when valid firstName and lastName are provided', () => {
    const handleBefore = jest.fn();
    const handleClientCancel = jest.fn();
    const handleClientError = jest.fn();
    const handleSuccess = jest.fn();

    const wrapper = shallow(
      <EditProfileForm
        user={user}
        onBeforeHook={handleBefore}
        onClientCancelHook={handleClientCancel}
        onClientErrorHook={handleClientError}
        onSuccessHook={handleSuccess}
      />,
    );

    // Sanity check
    expect(wrapper.find({ testID: 'editProfileFieldFirstName' }).props().value).not.toBeNull();
    expect(wrapper.find({ testID: 'editProfileFieldLastName' }).props().value).not.toBeNull();

    wrapper.find({ testID: 'editProfileFieldFirstName' }).props().onChangeText(validFirstName);
    wrapper.find({ testID: 'editProfileFieldLastName' }).props().onChangeText(validLastName);

    expect(wrapper.state().firstName).toBe(validFirstName);
    expect(wrapper.state().lastName).toBe(validLastName);

    wrapper.find({ testID: 'editProfileSubmitButton' }).props().onPress();

    expect(handleBefore).toBeCalled();
    expect(handleClientCancel).not.toBeCalled();
    expect(handleSuccess).toBeCalledWith(
      expect.objectContaining({
        firstName: validFirstName,
        lastName: validLastName,
      }),
    );
  });
});
