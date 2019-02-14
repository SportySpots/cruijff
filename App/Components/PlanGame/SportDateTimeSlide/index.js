import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { ScrollView } from 'react-native';
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';
import ErrorHandling from 'error-handling-utils';
import I18n from '../../../I18n';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import SportPickerField from '../../Common/SportPickerField';
import DatePickerField from '../../Common/DatePickerField';
import TimePickerField from '../../Common/TimePickerField';
import DurationPickerField from '../../Common/DurationPickerField';
import CapacityPickerField from '../../Common/CapacityPickerField';
import Spacer from '../../Common/Spacer';

// TODO: update I18n names
//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
export const INIT_STATE = {
  sport: null,
  date: null,
  time: null,
  duration: 90, // null,
  capacity: null,
};

export const INIT_ERRORS = {
  dateTime: [], // TODO: change to time
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SportDateTimeSlide extends React.PureComponent {
  render() {
    const {
      sport,
      date,
      time,
      duration,
      capacity,
      errors,
      onChange,
    } = this.props;

    // Apply translation and concatenate field errors (string)
    const dateTimeErrors = ErrorHandling.getFieldErrors(errors, 'dateTime', I18n.t);

    return (
      <ScrollView>
        <Spacer size="XL" />
        <SportPickerField
          testID="pickSport"
          value={sport}
          prefix={I18n.t('planGameScreen.sportDateTimeSlide.fields.sport.prefix')}
          size="ML"
          theme="mix"
          onChange={(value) => { onChange({ fieldName: 'sport', value }); }}
        />
        <Spacer size="S" />
        <DatePickerField
          testID="pickDate"
          value={date}
          prefix={I18n.t('planGameScreen.sportDateTimeSlide.fields.date.prefix')}
          // error={dateTimeErrors}
          size="ML"
          theme="mix"
          dateFormat="dddd D MMMM"
          onChange={(value) => { onChange({ fieldName: 'date', value }); }}
        />
        <Spacer size="S" />
        <TimePickerField
          testID="pickTime"
          value={time}
          prefix={I18n.t('planGameScreen.sportDateTimeSlide.fields.time.prefix')}
          error={dateTimeErrors}
          size="ML"
          theme="mix"
          onChange={(value) => { onChange({ fieldName: 'time', value }); }}
        />
        <Spacer size="S" />
        <DurationPickerField
          testID="pickDuration"
          label=""
          value={duration}
          prefix={I18n.t('planGameScreen.sportDateTimeSlide.fields.duration.prefix')}
          onChange={(value) => { onChange({ fieldName: 'duration', value }); }}
          theme="mix"
          size="ML"
          minWidth={150}
        />
        <Spacer size="S" />
        <CapacityPickerField
          testID="pickCapacity"
          value={capacity}
          prefix={I18n.t('planGameScreen.sportDateTimeSlide.fields.capacity.prefix')}
          suffix={I18n.t('planGameScreen.sportDateTimeSlide.fields.capacity.suffix')}
          size="ML"
          theme="mix"
          onChange={(value) => { onChange({ fieldName: 'capacity', value }); }}
        />
      </ScrollView>
    );
  }
}

// TODO: copy from EditGameForm
SportDateTimeSlide.validateFields = ({ date, time }) => {
  // Initialize errors
  const errors = cloneDeep(INIT_ERRORS);

  // TODO: 'sport', 'date', 'time' are required

  if (date && time) {
    const hours = time.hours();
    const minutes = time.minutes();
    const dateTime = date.clone().add(hours, 'hours').add(minutes, 'minutes');
    const now = moment();

    if (dateTime.diff(now) < 0) {
      errors.dateTime.push('planGameScreen.sportDateTimeSlide.fields.time.errors.pastDateTime');
    }
  }
  return errors;
};

SportDateTimeSlide.title = 'planGameScreen.sportDateTimeSlide.title'; // TODO: update using slide namespace
SportDateTimeSlide.requiredFields = ['sport', 'date', 'time'];
SportDateTimeSlide.nextBtnLabel = 'planGameScreen.sportDateTimeSlide.footer.nextBtnLabel';

SportDateTimeSlide.propTypes = {
  sport: propType(sportFragment),
  date: PropTypes.instanceOf(moment),
  time: PropTypes.instanceOf(moment),
  duration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  capacity: PropTypes.number,
  errors: PropTypes.shape({
    dateTime: PropTypes.arrayOf(PropTypes.string),
  }),
  onChange: PropTypes.func,
};

SportDateTimeSlide.defaultProps = {
  ...cloneDeep(INIT_STATE),
  errors: cloneDeep(INIT_ERRORS),
  onChange: () => {},
};

export default SportDateTimeSlide;


/*
import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { ScrollView } from 'react-native';
import moment from 'moment';
import ErrorHandling from 'error-handling-utils';
import I18n from '../../../I18n';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import SportPickerField from '../../Common/SportPickerField';
import DatePickerField from '../../Common/DatePickerField';
import TimePickerField from '../../Common/TimePickerField';
import DurationPickerField from '../../Common/DurationPickerField';
import CapacityPickerField from '../../Common/CapacityPickerField';
import Spacer from '../../Common/Spacer';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SportDateTimeSlide = ({
  sport,
  date,
  time,
  duration,
  capacity,
  errors,
  onChange,
}) => {
  // Apply translation and concatenate field errors (string)
  const dateTimeErrors = ErrorHandling.getFieldErrors(errors, 'dateTime', I18n.t);

  return (
    <ScrollView>
      <Spacer size="XL" />
      <SportPickerField
        testID="pickSport"
        value={sport}
        prefix={I18n.t('planGameScreen.sportDateTimeSlide.fields.sport.prefix')}
        size="ML"
        theme="mix"
        onChange={(value) => { onChange({ fieldName: 'sport', value }); }}
      />
      <Spacer size="S" />
      <DatePickerField
        testID="pickDate"
        value={date}
        prefix={I18n.t('planGameScreen.sportDateTimeSlide.fields.date.prefix')}
        // error={dateTimeErrors}
        size="ML"
        theme="mix"
        dateFormat="dddd D MMMM"
        onChange={(value) => { onChange({ fieldName: 'date', value }); }}
      />
      <Spacer size="S" />
      <TimePickerField
        testID="pickTime"
        value={time}
        prefix={I18n.t('planGameScreen.sportDateTimeSlide.fields.time.prefix')}
        error={dateTimeErrors}
        size="ML"
        theme="mix"
        onChange={(value) => { onChange({ fieldName: 'time', value }); }}
      />
      <Spacer size="S" />
      <DurationPickerField
        testID="pickDuration"
        label=""
        value={duration}
        prefix={I18n.t('planGameScreen.sportDateTimeSlide.fields.duration.prefix')}
        onChange={(value) => { onChange({ fieldName: 'duration', value }); }}
        theme="mix"
        size="ML"
        minWidth={150}
      />
      <Spacer size="S" />
      <CapacityPickerField
        testID="pickCapacity"
        value={capacity}
        prefix={I18n.t('planGameScreen.sportDateTimeSlide.fields.capacity.prefix')}
        suffix={I18n.t('planGameScreen.sportDateTimeSlide.fields.capacity.suffix')}
        size="ML"
        theme="mix"
        onChange={(value) => { onChange({ fieldName: 'capacity', value }); }}
      />
    </ScrollView>
  );
};

SportDateTimeSlide.propTypes = {
  sport: propType(sportFragment),
  date: PropTypes.instanceOf(moment),
  time: PropTypes.instanceOf(moment),
  duration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  capacity: PropTypes.number,
  errors: PropTypes.shape({
    dateTime: PropTypes.arrayOf(String),
  }),
  onChange: PropTypes.func,
};

SportDateTimeSlide.defaultProps = {
  sport: null,
  date: null,
  time: null,
  duration: null,
  capacity: null,
  errors: {
    dateTime: [],
  },
  onChange: () => {},
};

export default SportDateTimeSlide;

*/