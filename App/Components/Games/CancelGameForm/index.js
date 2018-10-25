import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import ErrorHandling from 'error-handling-utils';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import GameProperties from '../GameProperties';
import ClickableAttendees from '../ClickableAttendees';
import CancelMsg from '../CancelMsg';
import Block from '../../Common/Block';
import Divider from '../../Common/Divider';
import Label from '../../Common/Label';
import AlertMsg from '../../Common/AlertMsg';
import RaisedButton from '../../Common/RaisedButton';
import { getAttendees } from '../utils';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const MAX_CHARS = 120;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// TODO: introduce TopBottomLayout to hold body and button container
const Top = styled.ScrollView`
  flex: 1;
  background-color: ${Colors.white}
`;
//------------------------------------------------------------------------------
const Bottom = styled.View`
  display: flex;
  justify-content: center;
  height: 88px;
  background-color: ${Colors.white}
  border-top-width: 0.5px;
  border-color: ${Colors.lightGray}
  padding-horizontal: 16px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class CancelGameForm extends React.PureComponent {
  state = {
    cancelMsg: '',
    errors: {
      cancelMsg: [],
    },
  }

  clearErrors = () => {
    this.setState({ errors: { cancelMsg: [] } });
  };

  handleCancelMsgChange = (cancelMsg) => {
    const { errors } = this.state;

    // Update value and clear errors for the given field
    this.setState({
      cancelMsg,
      errors: ErrorHandling.clearErrors(errors, 'cancelMsg'),
    });
  }

  validateFields = ({ cancelMsg }) => {
    // Initialize errors
    const errors = {
      cancelMsg: [],
    };

    // Sanitize input
    const _cancelMsg = cancelMsg && cancelMsg.trim(); // eslint-disable-line no-underscore-dangle

    if (_cancelMsg.length > MAX_CHARS) {
      errors.cancelMsg.push(`Must be no more than ${MAX_CHARS} characters!`);
    }

    return errors;
  };

  handleSubmit = () => {
    const {
      game,
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

    // Get field values
    const { cancelMsg } = this.state;

    // Clear previous errors if any
    this.clearErrors();

    // Validate fields
    const errors = this.validateFields({ cancelMsg });

    // In case of errors, display on UI and return handler to parent component
    if (ErrorHandling.hasErrors(errors)) {
      this.setState({ errors });
      // Pass event up to parent component. onClientErrorHook will set 'disabled'
      // value back to 'false' so that the user can re-submit the form
      onClientErrorHook();
      return;
    }

    // Display confirm alert
    Alert.alert(
      I18n.t('Confirm'),
      I18n.t('Are you sure you want to cancel this game?'),
      [
        {
          text: I18n.t('No'),
          onPress: () => {
            // Pass event up to parent component. onClientErrorHook will set 'disabled'
            // value back to 'false' so that the user can re-submit the form
            onClientCancelHook();
          },
          style: 'cancel',
        },
        {
          text: I18n.t('Yes'),
          onPress: () => {
            // Pass event up to parent component. onSuccessHook 'disabled'
            // value back to 'false' so that the user can re-submit the form
            onSuccessHook({ gameUUID: game.uuid, cancelMsg });
          },
        },
      ],
    );
  }

  render() {
    const { game, disabled, onAttendeesPress } = this.props;
    const { cancelMsg, errors } = this.state;

    const attendees = getAttendees(game.attendees);
    const cancelMsgErrors = ErrorHandling.getFieldErrors(errors, 'cancelMsg');

    return [
      <Top key="top">
        <Block>
          <GameProperties game={game} />
        </Block>
        {attendees.length > 0 && [
          <Divider key="divider-game-attendees" />,
          <Block key="game-attendees">
            <Label>{I18n.t('Attending')}</Label>
            <ClickableAttendees
              attendees={attendees}
              onAttendeesPress={onAttendeesPress}
            />
          </Block>,
          <Divider key="divider-cancel-msg" />,
          <Block key="cancel-msg">
            <CancelMsg
              value={cancelMsg}
              characterRestriction={MAX_CHARS}
              onChangeText={this.handleCancelMsgChange}
              error={cancelMsgErrors}
            />
          </Block>,
          false && [
            <Divider key="divider-alert-warning" />,
            <Block key="alert-warning">
              <AlertMsg
                value={`${I18n.t('All attendees will receive an email update with your reason for cancellation')}.`}
                status="warning"
              />
            </Block>,
          ],
        ]}
      </Top>,
      <Bottom key="bottom">
        <RaisedButton
          testID="cancelGameFormCancelButton"
          variant="warning"
          label={I18n.t('Cancel this activity')}
          disabled={disabled}
          onPress={this.handleSubmit}
        />
      </Bottom>,
    ];
  }
}

CancelGameForm.propTypes = {
  game: propType(gameDetailsFragment).isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
  onAttendeesPress: PropTypes.func,
};

CancelGameForm.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onClientErrorHook: () => {},
  onSuccessHook: () => {},
  onAttendeesPress: () => {},
};

export default CancelGameForm;

