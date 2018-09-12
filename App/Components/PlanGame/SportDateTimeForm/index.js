import React from 'react';
import PropTypes from 'prop-types';
// import { propType } from 'graphql-anywhere';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
// import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import SportPickerField from '../../Common/SportPickerField';
import DatePickerField from '../../Common/DatePickerField';
import TimePickerField from '../../Common/TimePickerField';
import Spacer from '../../Common/Spacer';
import Row from '../../Common/Row';
import TextField from '../../Common/TextField';
import FormLayout from '../FormLayout';
import { Title, Label, FormField } from '../style';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SportAndTime = ({
  sport,
  date,
  time,
  duration,
  capacity,
  onChange,
}) => (
  <FormLayout
    title={I18n.t('Plan a game')}
    titleColor={Colors.white}
    bgColor={Colors.primaryGreen}
  >
    <KeyboardAwareScrollView>
      <Row>
        <Label>{I18n.t('I want to play')}</Label>
        <Spacer orientation="row" size="S" />
        <SportPickerField
          value={(sport && sport.name) || ''}
          size="ML"
          theme="white"
          onChange={(value) => { onChange({ fieldName: 'sport', value }); }}
        />
      </Row>
      <Row>
        <Label>{I18n.t('on')}</Label>
        <Spacer orientation="row" size="S" />
        <DatePickerField
          value={date}
          size="ML"
          theme="white"
          onChange={(value) => { onChange({ fieldName: 'date', value }); }}
        />
      </Row>
      <Row>
        <Label>{I18n.t('at')}</Label>
        <Spacer orientation="row" size="S" />
        <TimePickerField
          value={time}
          size="ML"
          theme="white"
          onChange={(value) => { onChange({ fieldName: 'time', value }); }}
        />
      </Row>
      {/* <Row>
        // Duration
        <Label>{I18n.t('at')}</Label>
        <TimePickerField
          value={time}
          onChange={(value) => { onChange({ fieldName: 'time', value }); }}
        />
      </Row>
      <Row>
        <Label>{I18n.t('with')}</Label>
        <TextField
          value={capacity}
          onBlur={(value) => { onChange({ fieldName: 'capacity', value }); }}
        />
        <Label> {I18n.t('people')}</Label>
      </Row> */}
    </KeyboardAwareScrollView>
  </FormLayout>
);

SportAndTime.propTypes = {
  sport: PropTypes.string, // propType(sportFragment),
  date: PropTypes.string,
  time: PropTypes.string,
  duration: PropTypes.string,
  capacity: PropTypes.string,
  onChange: PropTypes.func,
};

SportAndTime.defaultProps = {
  sport: null,
  date: null,
  time: '',
  duration: '',
  capacity: '',
  onChange: () => {},
};

export default SportAndTime;

