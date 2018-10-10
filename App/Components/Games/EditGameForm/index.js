import React from 'react';
import PropTypes from 'prop-types';
// import { Alert } from 'react-native';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import ErrorHandling from 'error-handling-utils';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
// import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import SportPickerField from '../../Common/SportPickerField';
import DatePickerField from '../../Common/DatePickerField';
import TimePickerField from '../../Common/TimePickerField';
import DurationPickerField from '../../Common/DurationPickerField';
import CapacityPickerField from '../../Common/CapacityPickerField';
import DescriptionField from '../../PlanGame/DescriptionField';
import Spacer from '../../Common/Spacer';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import Divider from '../../Common/Divider';
import Text from '../../Common/Text';
import TextField from '../../Common/TextField';
// import datePickerDatePropTypes from '../../../PropTypesDefinitions/datePickerDate';
import RaisedButton from '../../Common/RaisedButton';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const NAME_MAX_CHARS = 120;
const DESCRIPTION_MAX_CHARS = 300;
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
const DurationFieldContainer = styled.View`
  width: 170px;
`;
//------------------------------------------------------------------------------
const Half = styled.View`
  flex: 1;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class EditGameForm extends React.PureComponent {
  constructor(props) {
    super(props);

    const { game } = props;
    const {
      name,
      sport,
      date,
      time,
      duration,
      capacity,
      spot,
      description,
    } = game;

    this.state = {
      name,
      sport,
      date,
      time,
      duration,
      capacity,
      spot,
      description: description || '',
      errors: {
        name: [],
        description: [],
      },
    }
  }

  clearErrors = () => {
    this.setState({
      errors: {
        name: [],
        description: [],
      },
    });
  };

  handleChange = ({ fieldName, value }) => {
    if (!fieldName) {
      return;
    }

    const { errors } = this.state;

    // Update value and clear errors for the given field
    this.setState({
      [fieldName]: value,
      errors: ErrorHandling.clearErrors(errors, fieldName),
    });
  }

  validateFields = ({ name, description }) => {
    // Initialize errors
    const errors = {
      name: [],
      description: [],
    };

    // Sanitize input
    const _name = name && name.trim(); // eslint-disable-line no-underscore-dangle

    if (_name.length > NAME_MAX_CHARS) {
      errors.name.push(`Must be no more than ${NAME_MAX_CHARS} characters!`);
    }

    // Sanitize input
    const _description = description && description.trim(); // eslint-disable-line no-underscore-dangle

    if (_description.length > DESCRIPTION_MAX_CHARS) {
      errors.description.push(`Must be no more than ${DESCRIPTION_MAX_CHARS} characters!`);
    }

    return errors;
  };

  handleSubmit = () => {
    const { onBeforeHook, onClientErrorHook, onSuccessHook } = this.props;

    // Run before logic if provided and return on error. onBeforeHook will set the 'disabled'
    // value to 'true' so that the user cannot re-submit the form
    try {
      onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    // Get field values
    const {
      name,
      sport,
      date,
      time,
      duration,
      capacity,
      spot,
      description,
    } = this.state;

    // Clear previous errors if any
    this.clearErrors();

    // Validate fields
    const errors = this.validateFields({ name, description });

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
      name,
      sport,
      date,
      time,
      duration,
      capacity,
      spot,
      description,
    });
  }

  render() {
    const { game, disabled, onSpotPress } = this.props;
    const {
      name,
      sport,
      date,
      time,
      duration,
      capacity,
      spot,
      description,
      errors,
    } = this.state;

    const nameErrors = ErrorHandling.getFieldErrors(errors, 'name');
    const descriptionErrors = ErrorHandling.getFieldErrors(errors, 'description');

    return [
      <Top key="top">
        <Block>
          <TextField
            value={name}
            onChangeText={() => {}}
            label={I18n.t('Activity name')}
            error={nameErrors}
            // multiline
            placeholder={I18n.t('Write here why the activity does not continue')}
            size="ML"
          />
        </Block>
        <Divider />
        <Block bgColor={Colors.lightGray}>
          <TextField
            value={I18n.t(sport.name) || I18n.t(sport.category)}
            onChangeText={() => {}}
            label={I18n.t('Sport')}
            disabled
            size="ML"
            // error={error}
            // multiline
            // placeholder={I18n.t('Write here why the activity does not continue')}
          />
        </Block>
        <Divider />
        <Block>
          <DatePickerField
            value={date}
            size="ML"
            theme="black"
            onChange={(value) => { this.handleChange({ fieldName: 'date', value }); }}
          />
        </Block>
        <Divider />
        <Block>
          <Row>
            <Half>
              <TimePickerField
                value={time}
                size="ML"
                theme="black"
                onChange={(value) => { this.handleChange({ fieldName: 'time', value }); }}
              />
            </Half>
            <Half>
              <DurationFieldContainer>
                <DurationPickerField
                  label=""
                  value={duration}
                  onChange={(value) => { this.handleChange({ fieldName: 'duration', value }); }}
                  theme="black"
                  size="ML"
                />
              </DurationFieldContainer>
            </Half>
          </Row>
        </Block>
        <Divider />
        <Block>
          <CapacityPickerField
            value={capacity}
            size="ML"
            theme="black"
            onChange={(value) => { this.handleChange({ fieldName: 'capacity', value }); }}
          />
        </Block>
        <Divider />
        <Block>
          <DescriptionField
            value={description}
            label={I18n.t('Activity details')}
            characterRestriction={DESCRIPTION_MAX_CHARS}
            onChangeText={(value) => { this.handleChange({ fieldName: 'description', value }); }}
            theme="black"
            error={descriptionErrors}
          />
        </Block>
      </Top>,
      <Bottom key="bottom">
        <RaisedButton
          status="primary"
          label={I18n.t('Save')}
          disabled={disabled}
          onPress={this.handleSubmit}
        />
      </Bottom>,
    ];
  }
}

EditGameForm.propTypes = {
  game: propType(gameDetailsFragment).isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
  onSpotPress: PropTypes.func,
};

EditGameForm.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientErrorHook: () => {},
  onSuccessHook: () => {},
  onSpotPress: () => {},
};

export default EditGameForm;
