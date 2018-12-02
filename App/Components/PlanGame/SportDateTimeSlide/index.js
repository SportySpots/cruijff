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
        prefix={I18n.t('I want to play')}
        size="ML"
        theme="mix"
        onChange={(value) => { onChange({ fieldName: 'sport', value }); }}
      />
      <Spacer size="S" />
      <DatePickerField
        testID="pickDate"
        value={date}
        prefix={I18n.t('on')}
        error={dateTimeErrors}
        size="ML"
        theme="mix"
        dateFormat="dddd D MMMM"
        onChange={(value) => { onChange({ fieldName: 'date', value }); }}
      />
      <Spacer size="S" />
      <TimePickerField
        testID="pickTime"
        value={time}
        prefix={I18n.t('at')}
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
        prefix={I18n.t('during')}
        onChange={(value) => { onChange({ fieldName: 'duration', value }); }}
        theme="mix"
        size="ML"
        minWidth={150}
      />
      <Spacer size="S" />
      <CapacityPickerField
        testID="pickCapacity"
        value={capacity}
        prefix={I18n.t('with')}
        suffix={I18n.t('people')}
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
  errors: {},
  onChange: () => {},
};

export default SportDateTimeSlide;
