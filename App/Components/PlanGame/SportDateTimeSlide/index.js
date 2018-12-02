import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import ErrorHandling from 'error-handling-utils';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import SportPickerField from '../../Common/SportPickerField';
import DatePickerField from '../../Common/DatePickerField';
import TimePickerField from '../../Common/TimePickerField';
import DurationPickerField from '../../Common/DurationPickerField';
import CapacityPickerField from '../../Common/CapacityPickerField';
import Spacer from '../../Common/Spacer';
import Row from '../../Common/Row';
import Text from '../../Common/Text';
import datePickerDatePropTypes from '../../../PropTypesDefinitions/datePickerDate';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
export const Label = styled(Text.ML)`
  color: ${Colors.white};
  margin-bottom: 12px;
`;
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
      <Row alignItems="flex-end">
        <Label>{I18n.t('I want to play')}</Label>
        <Spacer row size="S" />
        <SportPickerField
          testID="pickSport"
          value={sport}
          size="ML"
          theme="mix"
          onChange={(value) => { onChange({ fieldName: 'sport', value }); }}
        />
      </Row>
      <Spacer size="S" />
      <Row alignItems="flex-end">
        <Label>{I18n.t('on')}</Label>
        <Spacer row size="S" />
        <DatePickerField
          testID="pickDate"
          value={date}
          error={dateTimeErrors}
          size="ML"
          theme="mix"
          dateFormat="dddd D MMMM"
          onChange={(value) => { onChange({ fieldName: 'date', value }); }}
        />
      </Row>
      <Spacer size="S" />
      <Row alignItems="flex-end">
        <Label>{I18n.t('at')}</Label>
        <Spacer row size="S" />
        <TimePickerField
          testID="pickTime"
          value={time}
          error={dateTimeErrors}
          size="ML"
          theme="mix"
          onChange={(value) => { onChange({ fieldName: 'time', value }); }}
        />
      </Row>
      <Spacer size="S" />
      <Row alignItems="flex-end">
        <Label>{I18n.t('during')}</Label>
        <Spacer row size="S" />
        <DurationPickerField
          testID="pickDuration"
          label=""
          value={duration}
          onChange={(value) => { onChange({ fieldName: 'duration', value }); }}
          theme="mix"
          size="ML"
          minWidth={150}
        />
      </Row>
      <Spacer size="S" />
      <Row alignItems="flex-end">
        <Label>{I18n.t('with')}</Label>
        <Spacer row size="S" />
        <CapacityPickerField
          testID="pickCapacity"
          value={capacity}
          size="ML"
          theme="mix"
          onChange={(value) => { onChange({ fieldName: 'capacity', value }); }}
        />
        <Spacer row size="S" />
        <Label>{I18n.t('people')}</Label>
      </Row>
    </ScrollView>
  );
}

SportDateTimeSlide.propTypes = {
  sport: propType(sportFragment),
  date: datePickerDatePropTypes,
  time: PropTypes.instanceOf(Date),
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
