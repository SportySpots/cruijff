import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components/native';
import I18n from '../../../I18n';
import scTheme from '../../../Themes/scTheme'; // styled-components theme
import SignupEmailForm, { MAX_CHARS } from '.';

const validName = 'John Doe';
const validEmail = 'valid@email.com';
const invalidEmail = 'invalid@email';
const longName = new Array(MAX_CHARS + 2).join('a'); // aaaaaa... length = MAX_CHARS + 1
const longEmail = `${new Array(MAX_CHARS - 8).join('a')}@email.com`; // aaaaaa...@email.com length = MAX_CHARS + 1

describe('SignupEmailForm', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(
      <ThemeProvider theme={scTheme}>
        <SignupEmailForm />
      </ThemeProvider>,
    ).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('renders custom label button', () => {
    const wrapper = shallow(<SignupEmailForm />);
    expect(wrapper.find({ testID: 'signupButtonSubmit' }).props().label).toBe(I18n.t('signupEmailForm.btnLabel'));
  });

  it('errors when form is submitted without name or email', () => {
    [
      {
        name: '',
        email: validEmail,
        errorFieldID: 'signupFieldName',
        errorMsg: 'signupEmailForm.fields.name.errors.required',
      },
      {
        name: validName,
        email: '',
        errorFieldID: 'signupFieldEmail',
        errorMsg: 'signupEmailForm.fields.email.errors.required',
      },
    ].forEach(({
      name,
      email,
      errorFieldID,
      errorMsg,
    }) => {
      const handleClientError = jest.fn();
      const wrapper = shallow(<SignupEmailForm onClientErrorHook={handleClientError} />);

      // Sanity check
      expect(wrapper.find({ testID: 'signupFieldName' }).props().value).toBe('');
      expect(wrapper.find({ testID: 'signupFieldEmail' }).props().value).toBe('');

      wrapper.find({ testID: 'signupFieldName' }).props().onChangeText(name);
      wrapper.find({ testID: 'signupFieldEmail' }).props().onChangeText(email);

      wrapper.find({ testID: 'signupButtonSubmit' }).props().onPress();

      expect(wrapper.find({ testID: errorFieldID }).props().error).toBe(I18n.t(errorMsg));
      expect(handleClientError).toBeCalled();
    });
  });

  it('errors when form is submitted with invalid email', () => {
    const handleClientError = jest.fn();
    const wrapper = shallow(<SignupEmailForm onClientErrorHook={handleClientError} />);

    // Sanity check
    expect(wrapper.find({ testID: 'signupFieldName' }).props().value).toBe('');
    expect(wrapper.find({ testID: 'signupFieldEmail' }).props().value).toBe('');

    wrapper.find({ testID: 'signupFieldName' }).props().onChangeText(validName);
    wrapper.find({ testID: 'signupFieldEmail' }).props().onChangeText(invalidEmail);

    wrapper.find({ testID: 'signupButtonSubmit' }).props().onPress();

    expect(wrapper.find({ testID: 'signupFieldEmail' }).props().error).toBe(I18n.t('signupEmailForm.fields.email.errors.invalid'));
    expect(handleClientError).toBeCalled();
  });

  it('errors when form is submitted with name or email length > MAX_CHARS', () => {
    [
      {
        name: longName,
        email: validEmail,
        errorFieldID: 'signupFieldName',
        errorMsg: 'signupEmailForm.fields.name.errors.tooLong',
      },
      {
        name: validName,
        email: longEmail,
        errorFieldID: 'signupFieldEmail',
        errorMsg: 'signupEmailForm.fields.email.errors.tooLong',
      },
    ].forEach(({
      name,
      email,
      errorFieldID,
      errorMsg,
    }) => {
      const handleClientError = jest.fn();
      const wrapper = shallow(<SignupEmailForm onClientErrorHook={handleClientError} />);

      // Sanity check
      expect(wrapper.find({ testID: 'signupFieldName' }).props().value).toBe('');
      expect(wrapper.find({ testID: 'signupFieldEmail' }).props().value).toBe('');

      wrapper.find({ testID: 'signupFieldName' }).props().onChangeText(name);
      wrapper.find({ testID: 'signupFieldEmail' }).props().onChangeText(email);

      wrapper.find({ testID: 'signupButtonSubmit' }).props().onPress();

      expect(wrapper.find({ testID: errorFieldID }).props().error).toBe(I18n.t(errorMsg));
      expect(handleClientError).toBeCalled();
    });
  });

  it('clears errors when name or email input field is modified after error', () => {
    [
      {
        name: '',
        validField: validName,
        email: validEmail,
        errorFieldID: 'signupFieldName',
        errorMsg: 'signupEmailForm.fields.name.errors.required',
      },
      {
        name: validName,
        email: '',
        validField: validEmail,
        errorFieldID: 'signupFieldEmail',
        errorMsg: 'signupEmailForm.fields.email.errors.required',
      },
    ].forEach(({
      name,
      email,
      errorFieldID,
      errorMsg,
      validField,
    }) => {
      const handleClientError = jest.fn();
      const wrapper = shallow(<SignupEmailForm onClientErrorHook={handleClientError} />);

      // Sanity check
      expect(wrapper.find({ testID: 'signupFieldName' }).props().value).toBe('');
      expect(wrapper.find({ testID: 'signupFieldEmail' }).props().value).toBe('');

      wrapper.find({ testID: 'signupFieldName' }).props().onChangeText(name);
      wrapper.find({ testID: 'signupFieldEmail' }).props().onChangeText(email);

      wrapper.find({ testID: 'signupButtonSubmit' }).props().onPress();

      expect(wrapper.find({ testID: errorFieldID }).props().error).toBe(I18n.t(errorMsg));
      expect(handleClientError).toBeCalled();

      wrapper.find({ testID: errorFieldID }).props().onChangeText(validField);
      wrapper.find({ testID: 'signupButtonSubmit' }).props().onPress();

      expect(wrapper.find({ testID: errorFieldID }).props().error).toBe('');
    });
  });

  it('aborts form submission if onBeforeHook throws', () => {
    const handleBefore = jest.fn().mockImplementation(() => { throw new Error(); });
    const handleClientCancel = jest.fn();
    const handleSuccess = jest.fn();

    const wrapper = shallow(
      <SignupEmailForm
        onBeforeHook={handleBefore}
        onClientCancelHook={handleClientCancel}
        onSuccessHook={handleSuccess}
      />,
    );

    // Sanity check
    expect(wrapper.find({ testID: 'signupFieldName' }).props().value).toBe('');
    expect(wrapper.find({ testID: 'signupFieldEmail' }).props().value).toBe('');

    wrapper.find({ testID: 'signupFieldName' }).props().onChangeText(validName);
    wrapper.find({ testID: 'signupFieldEmail' }).props().onChangeText(validEmail);

    wrapper.find({ testID: 'signupButtonSubmit' }).props().onPress();

    expect(handleBefore).toBeCalled();
    expect(handleClientCancel).toBeCalled();
    expect(handleSuccess).not.toBeCalled();
  });

  it('calls onSuccessHook when valid email is provided', () => {
    const handleBefore = jest.fn();
    const handleClientCancel = jest.fn();
    const handleClientError = jest.fn();
    const handleSuccess = jest.fn();

    const wrapper = shallow(
      <SignupEmailForm
        onBeforeHook={handleBefore}
        onClientCancelHook={handleClientCancel}
        onClientErrorHook={handleClientError}
        onSuccessHook={handleSuccess}
      />,
    );

    // Sanity check
    expect(wrapper.find({ testID: 'signupFieldName' }).props().value).toBe('');
    expect(wrapper.find({ testID: 'signupFieldEmail' }).props().value).toBe('');

    wrapper.find({ testID: 'signupFieldName' }).props().onChangeText(validName);
    wrapper.find({ testID: 'signupFieldEmail' }).props().onChangeText(validEmail);

    expect(wrapper.state().name).toBe(validName);
    expect(wrapper.state().email).toBe(validEmail);

    wrapper.find({ testID: 'signupButtonSubmit' }).props().onPress();

    expect(handleBefore).toBeCalled();
    expect(handleClientCancel).not.toBeCalled();
    expect(handleSuccess).toBeCalledWith(
      expect.objectContaining({
        name: validName,
        email: validEmail,
      }),
    );
  });
});
