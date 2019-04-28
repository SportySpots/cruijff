// import React from 'react';
// import PropTypes from 'prop-types';
// import { propType } from 'graphql-anywhere';
// import styled from 'styled-components/native';
// import ErrorHandling from 'error-handling-utils';
// import moment from 'moment';
// import cloneDeep from 'lodash/cloneDeep';
// import pick from 'lodash/pick';
// import I18n from '../../../I18n';
// import Colors from '../../../Themes/Colors';
// import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
// // import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
// // import SportPickerField from '../../Common/SportPickerField';
// import Spacer from '../../Common/Spacer';
// import Block from '../../Common/Block';
// import Row from '../../Common/Row';
// // import Text from '../../Common/Text';
// import TextField from '../../Common/TextField';
// import RaisedButton from '../../Common/RaisedButton';
// import ChatInputField from '../ChatInputField';

// //------------------------------------------------------------------------------
// // CONSTANTS:
// //------------------------------------------------------------------------------
// export const NAME_MAX_CHARS = 120;
// export const DESCRIPTION_MAX_CHARS = 2000;

// const INIT_STATE = {
//   text: '',
// };

// const INIT_ERRORS = {
//   text: [],
// };

// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// class ChatForm extends React.PureComponent {
//   constructor(props) {
//     super(props);

//     // const { game } = props;

//     this.state = {
//       ...cloneDeep(INIT_STATE),
//       errors: cloneDeep(INIT_ERRORS),
//     };

//     // console.log('STATE', this.state);
//   }

//   componentWillReceiveProps({ errors }) {
//     // Display (server side) errors coming from parent component
//     // TODO: if (errors && ErrorHandling.hasErrors(errors)) {
//     if (errors) {
//       this.setState({
//         errors: {
//           ...cloneDeep(INIT_ERRORS),
//           ...errors,
//         },
//       });
//     }
//   }

//   clearErrors = () => {
//     this.setState({ errors: cloneDeep(INIT_ERRORS) });
//   };

//   handleChange = ({ fieldName, value }) => {
//     const { errors } = this.state;

//     // Update value and clear errors for the given field
//     this.setState({
//       [fieldName]: value,
//       errors: ErrorHandling.clearErrors(errors, fieldName),
//     });
//   }

//   validateFields = ({ text }) => {
//     // Initialize errors
//     const errors = cloneDeep(INIT_ERRORS);

//     // Sanitize input
//     const _text = text && text.trim(); // eslint-disable-line no-underscore-dangle

//     if (!_text) {
//       errors.text.push('Message is required!');
//     }

//     // if (_text && _text.length > 4) {
//     //   errors.text.push('Message is too long!');
//     // }

//     return errors;
//   };

//   handleSubmit = () => {
//     const {
//       // game,
//       onBeforeHook,
//       onClientCancelHook,
//       onClientErrorHook,
//       onSuccessHook,
//     } = this.props;

//     // Run before logic if provided and return on error. onBeforeHook will set the 'disabled'
//     // value to 'true' so that the user cannot re-submit the form
//     try {
//       onBeforeHook();
//     } catch (exc) {
//       onClientCancelHook();
//       return; // return silently
//     }

//     // Clear previous errors if any
//     this.clearErrors();

//     // Validate fields
//     const errors = this.validateFields(this.state);

//     // In case of errors, display on UI and return handler to parent component
//     if (ErrorHandling.hasErrors(errors)) {
//       this.setState({ errors });
//       // Pass event up to parent component. onClientErrorHook will set 'disabled'
//       // value back to 'false' so that the user can re-submit the form
//       onClientErrorHook();
//       return;
//     }

//     // Pass event up to parent component. onSuccessHook 'disabled'
//     // value back to 'false' so that the user can re-submit the form
//     onSuccessHook({
//       // gameUUID: game.uuid,
//       ...pick(this.state, Object.keys(INIT_STATE)),
//     });

//     // Clear input field
//     this.setState({ text: '' });
//   }

//   render() {
//     const { disabled } = this.props;
//     const { text, errors } = this.state;

//     // Apply translation and concatenate field errors (string)
//     const textErrors = ErrorHandling.getFieldErrors(errors, 'text', I18n.t);

//     return (
//       <ChatInputField
//         testID="chatInputField"
//         // label={I18n.t('chatForm.fields.title.label')}
//         value={text}
//         error={textErrors}
//         // placeholder={I18n.t('chatForm.fields.title.placeholder')}
//         size="ML"
//         disabled={disabled}
//         // multiline
//         onChangeText={(value) => { this.handleChange({ fieldName: 'text', value }); }}
//         onSubmit={this.handleSubmit}
//       />
//     );
//   }
// }

// ChatForm.propTypes = {
//   // game: propType(gameDetailsFragment).isRequired,
//   disabled: PropTypes.bool,
//   errors: PropTypes.object, // eslint-disable-line
//   onBeforeHook: PropTypes.func,
//   onClientCancelHook: PropTypes.func,
//   onClientErrorHook: PropTypes.func,
//   onSuccessHook: PropTypes.func,
// };

// ChatForm.defaultProps = {
//   disabled: false,
//   errors: null,
//   onBeforeHook: () => {},
//   onClientCancelHook: () => {},
//   onClientErrorHook: () => {},
//   onSuccessHook: () => {},
// };

// export default ChatForm;
