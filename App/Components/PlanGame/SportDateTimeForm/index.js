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
`;
//------------------------------------------------------------------------------
const DurationFieldContainer = styled.View`
  width: 170px;
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
  <Spacer key="sport-spacer" size="XXXL" />,
  <Row key="sport">
    <Label>{I18n.t('I want to play')}</Label>
    <Spacer orientation="row" size="S" />
    <SportPickerField
      value={sport}
      size="ML"
      theme="white"
      onChange={(value) => { onChange({ fieldName: 'sport', value }); }}
    />
  </Row>,
  <Spacer key="date-spacer" size="XXL" />,
  <Row key="date">
    <Label>{I18n.t('on')}</Label>
    <Spacer orientation="row" size="S" />
    <DatePickerField
      value={date}
      size="ML"
      theme="white"
      onChange={(value) => { onChange({ fieldName: 'date', value }); }}
    />
    <Spacer orientation="row" size="M" />
    <Label>{I18n.t('at')}</Label>
    <Spacer orientation="row" size="S" />
    <TimePickerField
      value={time}
      size="ML"
      theme="white"
      onChange={(value) => { onChange({ fieldName: 'time', value }); }}
    />
  </Row>,
  <Spacer key="time-duration-spacer" size="XXL" />,
  <Row key="time-duration">
    <Label>{I18n.t('during')}</Label>
    <Spacer orientation="row" size="S" />
    <DurationFieldContainer>
      <DurationPickerField
        label=""
        value={duration}
        onChange={(value) => { onChange({ fieldName: 'duration', value }); }}
        theme="white"
        size="ML"
      />
    </DurationFieldContainer>
  </Row>,
  <Spacer key="capacity-spacer" size="XXL" />,
  <Row key="capacity">
    <Label>{I18n.t('with')}</Label>
    <Spacer orientation="row" size="S" />
    <CapacityPickerField
      value={capacity}
      size="ML"
      theme="white"
      onChange={(value) => { onChange({ fieldName: 'capacity', value }); }}
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

