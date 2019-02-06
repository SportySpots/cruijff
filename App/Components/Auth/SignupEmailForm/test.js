import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import I18n from '../../../I18n';
import SignupEmailForm from '.';

describe('SignupEmailForm', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<SignupEmailForm />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('renders custom label button', () => {
    const wrapper = shallow(<SignupEmailForm />);
    expect(wrapper.find({ testID: 'signupButtonSubmit' }).props().label).toBe(I18n.t('signupEmailForm.btnLabel'));
  });

  it('errors when form is submitted without firstName, lastName or email', () => {
    [
      {
        firstName: '',
        lastName: 'Doe',
        email: 'valid@email.com',
        errorFieldID: 'signupFieldFirstName',
        errorMsg: 'signupEmailForm.fields.firstName.errors.required',
      },
      {
        firstName: 'John',
        lastName: '',
        email: 'valid@email.com',
        errorFieldID: 'signupFieldLastName',
        errorMsg: 'signupEmailForm.fields.lastName.errors.required',
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        email: '',
        errorFieldID: 'signupFieldEmail',
        errorMsg: 'signupEmailForm.fields.email.errors.required',
      },
    ].forEach(({
      firstName,
      lastName,
      email,
      errorFieldID,
      errorMsg,
    }) => {
      const handleClientError = jest.fn();
      const wrapper = shallow(<SignupEmailForm onClientErrorHook={handleClientError} />);

      // Sanity check
      expect(wrapper.find({ testID: 'signupFieldFirstName' }).props().value).toBe('');
      expect(wrapper.find({ testID: 'signupFieldLastName' }).props().value).toBe('');
      expect(wrapper.find({ testID: 'signupFieldEmail' }).props().value).toBe('');

      wrapper.find({ testID: 'signupFieldFirstName' }).props().onChangeText(firstName);
      wrapper.find({ testID: 'signupFieldLastName' }).props().onChangeText(lastName);
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
    expect(wrapper.find({ testID: 'signupFieldFirstName' }).props().value).toBe('');
    expect(wrapper.find({ testID: 'signupFieldLastName' }).props().value).toBe('');
    expect(wrapper.find({ testID: 'signupFieldEmail' }).props().value).toBe('');

    wrapper.find({ testID: 'signupFieldFirstName' }).props().onChangeText('Jonh');
    wrapper.find({ testID: 'signupFieldLastName' }).props().onChangeText('Doe');
    wrapper.find({ testID: 'signupFieldEmail' }).props().onChangeText('invalid@email');

    wrapper.find({ testID: 'signupButtonSubmit' }).props().onPress();

    expect(wrapper.find({ testID: 'signupFieldEmail' }).props().error).toBe(I18n.t('signupEmailForm.fields.email.errors.invalid'));
    expect(handleClientError).toBeCalled();
  });

  it('clears errors when firstName, lastName or email input field is modified after error', () => {
    [
      {
        firstName: '',
        validField: 'John',
        lastName: 'Doe',
        email: 'valid@email.com',
        errorFieldID: 'signupFieldFirstName',
        errorMsg: 'signupEmailForm.fields.firstName.errors.required',
      },
      {
        firstName: 'John',
        lastName: '',
        validField: 'Doe',
        email: 'valid@email.com',
        errorFieldID: 'signupFieldLastName',
        errorMsg: 'signupEmailForm.fields.lastName.errors.required',
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        email: '',
        validField: 'valid@email.com',
        errorFieldID: 'signupFieldEmail',
        errorMsg: 'signupEmailForm.fields.email.errors.required',
      },
    ].forEach(({
      firstName,
      lastName,
      email,
      errorFieldID,
      errorMsg,
      validField,
    }) => {
      const handleClientError = jest.fn();
      const wrapper = shallow(<SignupEmailForm onClientErrorHook={handleClientError} />);

      // Sanity check
      expect(wrapper.find({ testID: 'signupFieldFirstName' }).props().value).toBe('');
      expect(wrapper.find({ testID: 'signupFieldLastName' }).props().value).toBe('');
      expect(wrapper.find({ testID: 'signupFieldEmail' }).props().value).toBe('');

      wrapper.find({ testID: 'signupFieldFirstName' }).props().onChangeText(firstName);
      wrapper.find({ testID: 'signupFieldLastName' }).props().onChangeText(lastName);
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
    expect(wrapper.find({ testID: 'signupFieldFirstName' }).props().value).toBe('');
    expect(wrapper.find({ testID: 'signupFieldLastName' }).props().value).toBe('');
    expect(wrapper.find({ testID: 'signupFieldEmail' }).props().value).toBe('');

    wrapper.find({ testID: 'signupFieldFirstName' }).props().onChangeText('John');
    wrapper.find({ testID: 'signupFieldLastName' }).props().onChangeText('Doe');
    wrapper.find({ testID: 'signupFieldEmail' }).props().onChangeText('valid@email.com');

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
    expect(wrapper.find({ testID: 'signupFieldFirstName' }).props().value).toBe('');
    expect(wrapper.find({ testID: 'signupFieldLastName' }).props().value).toBe('');
    expect(wrapper.find({ testID: 'signupFieldEmail' }).props().value).toBe('');

    wrapper.find({ testID: 'signupFieldFirstName' }).props().onChangeText('John');
    wrapper.find({ testID: 'signupFieldLastName' }).props().onChangeText('Doe');
    wrapper.find({ testID: 'signupFieldEmail' }).props().onChangeText('valid@email.com');

    expect(wrapper.state().firstName).toBe('John');
    expect(wrapper.state().lastName).toBe('Doe');
    expect(wrapper.state().email).toBe('valid@email.com');

    wrapper.find({ testID: 'signupButtonSubmit' }).props().onPress();

    expect(handleBefore).toBeCalled();
    expect(handleClientCancel).not.toBeCalled();
    expect(handleSuccess).toBeCalledWith(
      expect.objectContaining({
        firstName: 'John',
        lastName: 'Doe',
        email: 'valid@email.com',
      }),
    );
  });
});
