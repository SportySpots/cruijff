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
const MAX_CHARS = 120;
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
        sport: [],
        date: [],
        time: [],
        duration: [],
        capacity: [],
        spot: [],
        description: [],
      },
    }
  }

  clearErrors = () => {
    this.setState({
      errors: {
        sport: [],
        date: [],
        time: [],
        duration: [],
        capacity: [],
        spot: [],
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

  // validateFields = ({ cancelMsg }) => {
  //   // Initialize errors
  //   const errors = {
  //     cancelMsg: [],
  //   };

  //   // Sanitize input
  //   const _cancelMsg = cancelMsg && cancelMsg.trim(); // eslint-disable-line no-underscore-dangle

  //   if (_cancelMsg.length > MAX_CHARS) {
  //     errors.cancelMsg.push(`Must be no more than ${MAX_CHARS} characters!`);
  //   }

  //   return errors;
  // };

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
    const { cancelMsg } = this.state;

    // Clear previous errors if any
    this.clearErrors();

    // Validate fields
    // const errors = this.validateFields({ cancelMsg });

    // // In case of errors, display on UI and return handler to parent component
    // if (ErrorHandling.hasErrors(errors)) {
    //   this.setState({ errors });
    //   // Pass event up to parent component. onClientErrorHook will set 'disabled'
    //   // value back to 'false' so that the user can re-submit the form
    //   onClientErrorHook();
    //   return;
    // }

    // Display confirm alert
    // Alert.alert(
    //   I18n.t('Confirm'),
    //   I18n.t('Are you sure you want to cancel this game?'),
    //   [
    //     {
    //       text: I18n.t('No'),
    //       onPress: () => {
    //         // Pass event up to parent component. onClientErrorHook will set 'disabled'
    //         // value back to 'false' so that the user can re-submit the form
    //         onClientErrorHook();
    //       },
    //       style: 'cancel',
    //     },
    //     {
    //       text: I18n.t('Yes'),
    //       onPress: () => {
    //         // Pass event up to parent component. onSuccessHook 'disabled'
    //         // value back to 'false' so that the user can re-submit the form
    //         onSuccessHook({ cancelMsg });
    //       },
    //     },
    //   ],
    // );
  }

  render() {
    const { game, disabled, onAttendeesPress } = this.props;
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
    const sportErrors = ErrorHandling.getFieldErrors(errors, 'sport');
    const dateErrors = ErrorHandling.getFieldErrors(errors, 'date');
    const timeErrors = ErrorHandling.getFieldErrors(errors, 'time');
    const durationErrors = ErrorHandling.getFieldErrors(errors, 'duration');
    const capacityErrors = ErrorHandling.getFieldErrors(errors, 'capacity');
    const spotErrors = ErrorHandling.getFieldErrors(errors, 'spot');
    const descriptionErrors = ErrorHandling.getFieldErrors(errors, 'description');

    return [
      <Top key="top">
        <Block>
          <TextField
            value={name}
            onChangeText={() => {}}
            label={I18n.t('Activity name')}
            // error={error}
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
  onAttendeesPress: PropTypes.func,
};

EditGameForm.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientErrorHook: () => {},
  onSuccessHook: () => {},
  onAttendeesPress: () => {},
};

export default EditGameForm;

/*
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
import Spacer from '../../Common/Spacer';
import Row from '../../Common/Row';
import Text from '../../Common/Text';
// import TextField from '../../Common/TextField';
// import datePickerDatePropTypes from '../../../PropTypesDefinitions/datePickerDate';

import RaisedButton from '../../Common/RaisedButton';

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
export const Label = styled(Text.ML)`
  color: ${Colors.white};
`;
//------------------------------------------------------------------------------
const DurationFieldContainer = styled.View`
  width: 170px;
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
        sport: [],
        date: [],
        time: [],
        duration: [],
        capacity: [],
        spot: [],
        description: [],
      },
    }
  }

  clearErrors = () => {
    this.setState({
      errors: {
        sport: [],
        date: [],
        time: [],
        duration: [],
        capacity: [],
        spot: [],
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

  // validateFields = ({ cancelMsg }) => {
  //   // Initialize errors
  //   const errors = {
  //     cancelMsg: [],
  //   };

  //   // Sanitize input
  //   const _cancelMsg = cancelMsg && cancelMsg.trim(); // eslint-disable-line no-underscore-dangle

  //   if (_cancelMsg.length > MAX_CHARS) {
  //     errors.cancelMsg.push(`Must be no more than ${MAX_CHARS} characters!`);
  //   }

  //   return errors;
  // };

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
    const { cancelMsg } = this.state;

    // Clear previous errors if any
    this.clearErrors();

    // Validate fields
    // const errors = this.validateFields({ cancelMsg });

    // // In case of errors, display on UI and return handler to parent component
    // if (ErrorHandling.hasErrors(errors)) {
    //   this.setState({ errors });
    //   // Pass event up to parent component. onClientErrorHook will set 'disabled'
    //   // value back to 'false' so that the user can re-submit the form
    //   onClientErrorHook();
    //   return;
    // }

    // Display confirm alert
    // Alert.alert(
    //   I18n.t('Confirm'),
    //   I18n.t('Are you sure you want to cancel this game?'),
    //   [
    //     {
    //       text: I18n.t('No'),
    //       onPress: () => {
    //         // Pass event up to parent component. onClientErrorHook will set 'disabled'
    //         // value back to 'false' so that the user can re-submit the form
    //         onClientErrorHook();
    //       },
    //       style: 'cancel',
    //     },
    //     {
    //       text: I18n.t('Yes'),
    //       onPress: () => {
    //         // Pass event up to parent component. onSuccessHook 'disabled'
    //         // value back to 'false' so that the user can re-submit the form
    //         onSuccessHook({ cancelMsg });
    //       },
    //     },
    //   ],
    // );
  }

  render() {
    const { game, disabled, onAttendeesPress } = this.props;
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
    const sportErrors = ErrorHandling.getFieldErrors(errors, 'sport');
    const dateErrors = ErrorHandling.getFieldErrors(errors, 'date');
    const timeErrors = ErrorHandling.getFieldErrors(errors, 'time');
    const durationErrors = ErrorHandling.getFieldErrors(errors, 'duration');
    const capacityErrors = ErrorHandling.getFieldErrors(errors, 'capacity');
    const spotErrors = ErrorHandling.getFieldErrors(errors, 'spot');
    const descriptionErrors = ErrorHandling.getFieldErrors(errors, 'description');

    return [
      <Top key="top">
      {/* <Row>
      <TextField
          value={name}
          onChangeText={(value) => { this.handleChange({ fieldName: 'name', value }); }}
          // label={I18n.t('Activity name')}
          // error={nameErrors}
          // placeholder={I18n.t('Write here why the activity does not continue')}
        />
      </Row> ///}

      <Row>
      <Label>{I18n.t('I want to play')}</Label>
      <Spacer orientation="row" size="S" />
      <SportPickerField
        value={sport}
        size="ML"
        theme="black"
        onChange={(value) => { this.handleChange({ fieldName: 'sport', value }); }}
      />
    </Row>
    <Spacer size="XXL" />
    <Row>
      <Label>{I18n.t('on')}</Label>
      <Spacer orientation="row" size="S" />
      <DatePickerField
        value={date}
        size="ML"
        theme="black"
        onChange={(value) => { this.handleChange({ fieldName: 'date', value }); }}
      />
      <Spacer orientation="row" size="M" />
      <Label>{I18n.t('at')}</Label>
      <Spacer orientation="row" size="S" />
      <TimePickerField
        value={time}
        size="ML"
        theme="black"
        onChange={(value) => { this.handleChange({ fieldName: 'time', value }); }}
      />
    </Row>
    <Spacer size="XXL" />
    <Row>
      <Label>{I18n.t('during')}</Label>
      <Spacer orientation="row" size="S" />
      <DurationFieldContainer>
        <DurationPickerField
          label=""
          value={duration}
          onChange={(value) => { this.handleChange({ fieldName: 'duration', value }); }}
          theme="black"
          size="ML"
        />
      </DurationFieldContainer>
    </Row>
    <Spacer size="XXL" />
    <Row>
      <Label>{I18n.t('with')}</Label>
      <Spacer orientation="row" size="S" />
      <CapacityPickerField
        value={capacity}
        size="ML"
        theme="black"
        onChange={(value) => { this.handleChange({ fieldName: 'capacity', value }); }}
      />
      <Spacer orientation="row" size="S" />
      <Label>{I18n.t('people')}</Label>
    </Row>
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
onAttendeesPress: PropTypes.func,
};

EditGameForm.defaultProps = {
disabled: false,
onBeforeHook: () => {},
onClientErrorHook: () => {},
onSuccessHook: () => {},
onAttendeesPress: () => {},
};

export default EditGameForm;

*/
