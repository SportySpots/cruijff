import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components/native';
import ErrorHandling from 'error-handling-utils';
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
// import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
// import SportPickerField from '../../Common/SportPickerField';
import Spacer from '../../Common/Spacer';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
// import Text from '../../Common/Text';
import TextField from '../../Common/TextField';
import RaisedButton from '../../Common/RaisedButton';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
export const NAME_MAX_CHARS = 120;
export const DESCRIPTION_MAX_CHARS = 2000;

const INIT_STATE = {
  msg: '',
};

const INIT_ERRORS = {
  msg: [],
};

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ChatForm extends React.PureComponent {
  constructor(props) {
    super(props);

    // const { game } = props;

    this.state = {
      ...cloneDeep(INIT_STATE),
      errors: cloneDeep(INIT_ERRORS),
    };

    // console.log('STATE', this.state);
  }

  componentWillReceiveProps({ errors }) {
    // Display (server side) errors coming from parent component
    if (errors) {
      this.setState({
        errors: {
          ...cloneDeep(INIT_ERRORS),
          ...errors,
        },
      });
    }
  }

  clearErrors = () => {
    this.setState({ errors: cloneDeep(INIT_ERRORS) });
  };

  handleChange = ({ fieldName, value }) => {
    const { errors } = this.state;

    // Update value and clear errors for the given field
    this.setState({
      [fieldName]: value,
      errors: ErrorHandling.clearErrors(errors, fieldName),
    });
  }

  validateFields = ({ msg }) => {
    // Initialize errors
    const errors = cloneDeep(INIT_ERRORS);

    // const { game } = this.props;

    // Sanitize input
    // const _name = name && name.trim(); // eslint-disable-line no-underscore-dangle

    // if (!_name) {
    //   errors.name.push('ChatForm.fields.title.errors.required');
    // } else if (_name.length > NAME_MAX_CHARS) {
    //   errors.name.push('ChatForm.fields.title.errors.tooLong');
    // }

    // if (!date) {
    //   errors.date.push('ChatForm.fields.date.errors.required');
    // }

    // if (!time) {
    //   errors.time.push('ChatForm.fields.time.errors.required');
    // }

    // if (date && time) {
    //   const hours = time.hours();
    //   const minutes = time.minutes();
    //   const dateTime = date.clone().add(hours, 'hours').add(minutes, 'minutes');
    //   const now = moment.utc();
    //   const diff = dateTime.diff(now, 'seconds');

    //   if (diff < 0) {
    //     errors.time.push('ChatForm.fields.time.errors.pastDateTime');
    //   }
    // }

    // if (!duration) {
    //   errors.duration.push('ChatForm.fields.duration.errors.required');
    // }

    // // Sanitize input
    // const _description = description && description.trim(); // eslint-disable-line no-underscore-dangle

    // if (_description.length > DESCRIPTION_MAX_CHARS) {
    //   errors.description.push('ChatForm.fields.description.errors.tooLong');
    // }

    // const attendees = getAttendees(game.attendees);
    // if (capacity && attendees.length > capacity) {
    //   errors.capacity.push('ChatForm.fields.capacity.errors.noFit');
    // }

    return errors;
  };

  handleSubmit = () => {
    const {
      // game,
      onBeforeHook,
      onClientCancelHook,
      onClientErrorHook,
      onSuccessHook,
    } = this.props;

    // Run before logic if provided and return on error. onBeforeHook will set the 'disabled'
    // value to 'true' so that the user cannot re-submit the form
    try {
      onBeforeHook();
    } catch (exc) {
      onClientCancelHook();
      return; // return silently
    }

    // Clear previous errors if any
    this.clearErrors();

    // Validate fields
    const errors = this.validateFields(this.state);

    // In case of errors, display on UI and return handler to parent component
    if (ErrorHandling.hasErrors(errors)) {
      this.setState({ errors });
      // Pass event up to parent component. onClientErrorHook will set 'disabled'
      // value back to 'false' so that the user can re-submit the form
      onClientErrorHook();
      return;
    }

    // Pass event up to parent component. onSuccessHook 'disabled'
    // value back to 'false' so that the user can re-submit the form
    onSuccessHook({
      // gameUUID: game.uuid,
      ...pick(this.state, Object.keys(INIT_STATE)),
    });
  }

  render() {
    const { disabled } = this.props;
    const { msg, errors } = this.state;

    // Apply translation and concatenate field errors (string)
    const msgErrors = ErrorHandling.getFieldErrors(errors, 'msg', I18n.t);

    return (
      <Row>
        <Block midHeight>
          <TextField
            testID="chatFieldMsg"
            // label={I18n.t('chatForm.fields.title.label')}
            value={msg}
            error={msgErrors}
            // placeholder={I18n.t('chatForm.fields.title.placeholder')}
            size="ML"
            disabled={disabled}
            // multiline
            onChangeText={(value) => { this.handleChange({ fieldName: 'msg', value }); }}
          />
        </Block>
        <RaisedButton
          testID="editGameSubmitButton"
          variant="primary"
          label={I18n.t('ChatForm.btnLabel')}
          disabled={disabled}
          onPress={this.handleSubmit}
        />
      </Row>
    );
  }
}

ChatForm.propTypes = {
  // game: propType(gameDetailsFragment).isRequired,
  disabled: PropTypes.bool,
  errors: PropTypes.object, // eslint-disable-line
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

ChatForm.defaultProps = {
  disabled: false,
  errors: null,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onClientErrorHook: () => {},
  onSuccessHook: () => {},
};

export default ChatForm;
