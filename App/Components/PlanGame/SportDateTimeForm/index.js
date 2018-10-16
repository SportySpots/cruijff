import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
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
const SportAndTimeForm = ({
  sport,
  date,
  time,
  duration,
  capacity,
  onChange,
}) => [
  <Spacer key="sport-spacer" size="XL" />,
  <Row
    key="sport"
    alignItems="flex-end"
  >
    <Label>{I18n.t('I want to play')}</Label>
    <Spacer orientation="row" size="S" />
    <SportPickerField
      value={sport}
      size="ML"
      theme="mix"
      onChange={(value) => { onChange({ fieldName: 'sport', value }); }}
      width={200}
    />
  </Row>,
  <Spacer key="date-spacer" size="S" />,
  <Row
    key="date"
    alignItems="flex-end"
  >
    <Label>{I18n.t('on')}</Label>
    <Spacer orientation="row" size="S" />
    <DatePickerField
      value={date}
      size="ML"
      theme="mix"
      onChange={(value) => { onChange({ fieldName: 'date', value }); }}
      width={120}
    />
    <Spacer orientation="row" size="M" />
    <Label>{I18n.t('at')}</Label>
    <Spacer orientation="row" size="S" />
    <TimePickerField
      value={time}
      size="ML"
      theme="mix"
      onChange={(value) => { onChange({ fieldName: 'time', value }); }}
      width={120}
    />
  </Row>,
  <Spacer key="time-duration-spacer" size="S" />,
  <Row
    key="time-duration"
    alignItems="flex-end"
  >
    <Label>{I18n.t('during')}</Label>
    <Spacer orientation="row" size="S" />
    <DurationPickerField
      label=""
      value={duration}
      onChange={(value) => { onChange({ fieldName: 'duration', value }); }}
      theme="mix"
      size="ML"
      width={170}
    />
  </Row>,
  <Spacer key="capacity-spacer" size="S" />,
  <Row
    key="capacity"
    alignItems="flex-end"
  >
    <Label>{I18n.t('with')}</Label>
    <Spacer orientation="row" size="S" />
    <CapacityPickerField
      value={capacity}
      size="ML"
      theme="mix"
      onChange={(value) => { onChange({ fieldName: 'capacity', value }); }}
      width={100}
    />
    <Spacer orientation="row" size="S" />
    <Label>{I18n.t('people')}</Label>
  </Row>,
];

SportAndTimeForm.propTypes = {
  sport: propType(sportFragment),
  date: datePickerDatePropTypes,
  time: PropTypes.instanceOf(Date),
  duration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  capacity: PropTypes.number,
  onChange: PropTypes.func,
};

SportAndTimeForm.defaultProps = {
  sport: null,
  date: null,
  time: null,
  duration: null,
  capacity: null,
  onChange: () => {},
};

export default SportAndTimeForm;
