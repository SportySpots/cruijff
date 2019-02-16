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
import { TopLayout, BottomLayout } from '../../Layouts/FixedBottomLayout';
// import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
// import SportPickerField from '../../Common/SportPickerField';
import DatePickerField from '../../Common/DatePickerField';
import TimePickerField from '../../Common/TimePickerField';
import DurationPickerField from '../../Common/DurationPickerField';
import CapacityPickerField from '../../Common/CapacityPickerField';
import SpotPickerField from '../../Common/SpotPickerField';
// import Spacer from '../../Common/Spacer';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import Divider from '../../Common/Divider';
// import Text from '../../Common/Text';
import TextField from '../../Common/TextField';
import SwitchWithText from '../../Common/SwitchWithText';
import RaisedButton from '../../Common/RaisedButton';
import { getAttendees } from '../utils';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
export const NAME_MAX_CHARS = 120;
export const DESCRIPTION_MAX_CHARS = 2000;

let INIT_STATE;

const getInitState = (game) => {
  const {
    name,
    sport,
    start_time: startTime,
    end_time: endTime,
    capacity,
    spot,
    description,
    invite_mode: inviteMode,
  } = game;

  const startMoment = startTime ? moment.utc(startTime) : null;
  const endMoment = endTime ? moment.utc(endTime) : null;

  // TODO: handle case when startMoment is null
  return {
    name,
    sport,
    date: startMoment.clone().startOf('day'),
    time: startMoment.clone(),
    duration: startTime && endTime ? endMoment.diff(startMoment, 'minutes') : null,
    capacity,
    spot,
    description: description || '',
    isPublic: inviteMode !== 'INVITE_ONLY',
  };
};

const INIT_ERRORS = {
  name: [],
  date: [],
  time: [],
  duration: [],
  capacity: [],
  description: [],
};
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Half = styled.View`
  flex: 1;
`;
//------------------------------------------------------------------------------
const FullHeight = styled.View`
  flex: 1; /* full height */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class EditGameForm extends React.PureComponent {
  constructor(props) {
    super(props);

    const { game } = props;
    // console.log('GAME', game);
    INIT_STATE = getInitState(game);

    this.state = {
      ...cloneDeep(INIT_STATE),
      errors: cloneDeep(INIT_ERRORS),
      // Keep track of field position in order to 'scroll to' on error
      offsetY: Object.keys(INIT_ERRORS).reduce((output, key) => (
        Object.assign({}, output, { [key]: 0 })
      ), {}),
    };

    // console.log('STATE', this.state);
  }

  clearErrors = () => {
    this.setState({ errors: cloneDeep(INIT_ERRORS) });
  };

  handleLayout = ({ fieldName, nativeEvent }) => {
    const { offsetY } = this.state;

    this.setState({
      offsetY: {
        ...offsetY,
        [fieldName]: nativeEvent.layout.y,
      },
    });
  }

  handleChange = ({ fieldName, value }) => {
    const { errors } = this.state;

    // Update value and clear errors for the given field
    this.setState({
      [fieldName]: value,
      errors: ErrorHandling.clearErrors(errors, fieldName),
    });
  }

  validateFields = ({
    name,
    date,
    time,
    duration,
    capacity,
    description,
  }) => {
    // Initialize errors
    const errors = cloneDeep(INIT_ERRORS);

    const { game } = this.props;

    // Sanitize input
    const _name = name && name.trim(); // eslint-disable-line no-underscore-dangle

    if (!_name) {
      errors.name.push('editGameForm.fields.title.errors.required');
    } else if (_name.length > NAME_MAX_CHARS) {
      errors.name.push('editGameForm.fields.title.errors.tooLong');
    }

    if (!date) {
      errors.date.push('editGameForm.fields.date.errors.required');
    }

    if (!time) {
      errors.time.push('editGameForm.fields.time.errors.required');
    }

    if (date && time) {
      const hours = time.hours();
      const minutes = time.minutes();
      const dateTime = date.clone().add(hours, 'hours').add(minutes, 'minutes');
      const now = moment.utc();
      const diff = dateTime.diff(now, 'seconds');

      if (diff < 0) {
        errors.time.push('editGameForm.fields.time.errors.pastDateTime');
      }
    }

    if (!duration) {
      errors.duration.push('editGameForm.fields.duration.errors.required');
    }

    // Sanitize input
    const _description = description && description.trim(); // eslint-disable-line no-underscore-dangle

    if (_description.length > DESCRIPTION_MAX_CHARS) {
      errors.description.push('editGameForm.fields.description.errors.tooLong');
    }

    const attendees = getAttendees(game.attendees);
    if (capacity && attendees.length > capacity) {
      errors.capacity.push('editGameForm.fields.capacity.errors.noFit');
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

    // Clear previous errors if any
    this.clearErrors();

    // Validate fields
    const errors = this.validateFields(this.state);

    // In case of errors, display on UI and return handler to parent component
    if (ErrorHandling.hasErrors(errors)) {
      this.setState({ errors });
      // Scroll to first error field
      const { offsetY } = this.state;
      const firstErrorKey = ErrorHandling.getFirstError(errors).key; // 'name', 'attendees', 'description'
      const y = parseInt(offsetY[firstErrorKey], 10);
      if (this.scroller) {
        this.scroller.scrollTo({ x: 0, y });
      }
      // Pass event up to parent component. onClientErrorHook will set 'disabled'
      // value back to 'false' so that the user can re-submit the form
      onClientErrorHook();
      return;
    }

    // Pass event up to parent component. onSuccessHook 'disabled'
    // value back to 'false' so that the user can re-submit the form
    onSuccessHook({
      gameUUID: game.uuid,
      ...pick(this.state, Object.keys(INIT_STATE)),
    });
  }

  render() {
    const { disabled } = this.props;
    const {
      name,
      sport,
      date,
      time,
      duration,
      capacity,
      spot,
      description,
      isPublic,
      errors,
    } = this.state;

    // Apply translation and concatenate field errors (string)
    const nameErrors = ErrorHandling.getFieldErrors(errors, 'name', I18n.t);
    const dateErrors = ErrorHandling.getFieldErrors(errors, 'date', I18n.t);
    const timeErrors = ErrorHandling.getFieldErrors(errors, 'time', I18n.t);
    const durationErrors = ErrorHandling.getFieldErrors(errors, 'duration', I18n.t);
    const capacityErrors = ErrorHandling.getFieldErrors(errors, 'capacity', I18n.t);
    const descriptionErrors = ErrorHandling.getFieldErrors(errors, 'description', I18n.t);

    return (
      <FullHeight>
        <TopLayout ref={(scroller) => { this.scroller = scroller; }}>
          <Block
            midHeight
            onLayout={({ nativeEvent }) => { this.handleLayout({ fieldName: 'name', nativeEvent }); }}
          >
            <TextField
              testID="editGameFieldName"
              label={I18n.t('editGameForm.fields.title.label')}
              value={name}
              error={nameErrors}
              placeholder={I18n.t('editGameForm.fields.title.placeholder')}
              size="ML"
              disabled={disabled}
              // multiline
              onChangeText={(value) => { this.handleChange({ fieldName: 'name', value }); }}
            />
          </Block>
          <Block
            midHeight
            bgColor={Colors.silver}
          >
            <TextField
              label={I18n.t('editGameForm.fields.sport.label')}
              value={(sport.name && I18n.t(sport.name)) || (sport.category && I18n.t(sport.category))}
              size="ML"
              disabled // always disabled
              onChangeText={() => {}}
            />
          </Block>
          <Block
            midHeight
            onLayout={({ nativeEvent }) => { this.handleLayout({ fieldName: 'date', nativeEvent }); }}
          >
            <DatePickerField
              testID="editGameFieldDate"
              label={I18n.t('editGameForm.fields.date.label')}
              value={date}
              error={dateErrors}
              size="ML"
              disabled={disabled}
              theme="transparent"
              dateFormat="DD/MM/YYYY"
              boxed
              onChange={(value) => { this.handleChange({ fieldName: 'date', value }); }}
            />
          </Block>
          <Divider />
          <Row onLayout={({ nativeEvent }) => { this.handleLayout({ fieldName: 'time', nativeEvent }); }}>
            <Half>
              <Block midHeight>
                <TimePickerField
                  testID="editGameFieldTime"
                  label={I18n.t('editGameForm.fields.time.label')}
                  value={time}
                  error={timeErrors}
                  size="ML"
                  disabled={disabled}
                  theme="transparent"
                  boxed
                  onChange={(value) => { this.handleChange({ fieldName: 'time', value }); }}
                />
              </Block>
            </Half>
            <Divider row />
            <Half>
              <Block
                midHeight
                onLayout={({ nativeEvent }) => { this.handleLayout({ fieldName: 'duration', nativeEvent }); }}
              >
                <DurationPickerField
                  testID="editGameFieldDuration"
                  label={I18n.t('editGameForm.fields.duration.label')}
                  value={duration}
                  error={durationErrors}
                  size="ML"
                  disabled={disabled}
                  theme="transparent"
                  boxed
                  onChange={(value) => { this.handleChange({ fieldName: 'duration', value }); }}
                />
              </Block>
            </Half>
          </Row>
          <Divider />
          <Block
            midHeight
            onLayout={({ nativeEvent }) => { this.handleLayout({ fieldName: 'capacity', nativeEvent }); }}
          >
            <CapacityPickerField
              testID="editGameFieldCapacity"
              label={I18n.t('editGameForm.fields.capacity.label')}
              value={capacity}
              error={capacityErrors}
              size="ML"
              disabled={disabled}
              theme="transparent"
              boxed
              onChange={(value) => { this.handleChange({ fieldName: 'capacity', value }); }}
            />
          </Block>
          <Divider />
          <Block>
            <SpotPickerField
              value={spot}
              sport={sport}
              disabled={disabled}
              onChange={(value) => { this.handleChange({ fieldName: 'spot', value }); }}
            />
          </Block>
          <Divider />
          <Block
            midHeight
            onLayout={({ nativeEvent }) => { this.handleLayout({ fieldName: 'description', nativeEvent }); }}
          >
            <TextField
              testID="editGameFieldDescription"
              label={I18n.t('editGameForm.fields.description.label')}
              value={description}
              theme="black"
              error={descriptionErrors}
              disabled={disabled}
              characterRestriction={DESCRIPTION_MAX_CHARS}
              multiline
              placeholder={I18n.t('editGameForm.fields.description.placeholder')}
              onChangeText={(value) => { this.handleChange({ fieldName: 'description', value }); }}
            />
          </Block>
          <Divider />
          <Block>
            <SwitchWithText
              label={I18n.t('editGameForm.fields.isPublic.label')}
              value={!isPublic}
              disabled={disabled}
              onChange={(value) => { this.handleChange({ fieldName: 'isPublic', value: !value }); }}
            />
          </Block>
        </TopLayout>
        <BottomLayout>
          <RaisedButton
            testID="editGameSubmitButton"
            variant="primary"
            label={I18n.t('editGameForm.btnLabel')}
            disabled={disabled}
            onPress={this.handleSubmit}
          />
        </BottomLayout>
      </FullHeight>
    );
  }
}

EditGameForm.propTypes = {
  game: propType(gameDetailsFragment).isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

EditGameForm.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onClientErrorHook: () => {},
  onSuccessHook: () => {},
};

export default EditGameForm;
