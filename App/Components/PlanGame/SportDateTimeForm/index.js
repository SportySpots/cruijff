import React from 'react';
import PropTypes from 'prop-types';
// import { propType } from 'graphql-anywhere';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
// import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import SportPickerField from '../../Common/SportPickerField';
import DatePickerField from '../../Common/DatePickerField';
import TimePickerField from '../../Common/TimePickerField';
import DurationPickerField from '../../Common/DurationPickerField';
import Spacer from '../../Common/Spacer';
import Row from '../../Common/Row';
import TextField from '../../Common/TextField';
import FormLayout from '../FormLayout';
import { Title, Label } from '../style';
import Fonts from '../../../Themes/Fonts';

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
    <Spacer size="XXL" />
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
    <Spacer size="XXL" />
    <Row>
      <Label>{I18n.t('at')}</Label>
      <Spacer orientation="row" size="S" />
      <TimePickerField
        value={time}
        size="ML"
        theme="white"
        onChange={(value) => { onChange({ fieldName: 'time', value }); }}
      />
      <Spacer orientation="row" size="M" />
      <Label>{I18n.t('during')}</Label>
      <Spacer orientation="row" size="S" />
      <View style={{ flex: 1, marginTop: -32, borderColor: 'transparent', borderWidth: 1 }}>
        <DurationPickerField
          label=""
          value={duration}
          onChange={(value) => { onChange({ fieldName: 'duration', value }); }}
          theme="white"
          size="ML"
          // inputContainerPadding={4}
          // inputContainerStyle={{ paddingHorizontal: 8 }}
        />
      </View>
    </Row>
    <Spacer size="XXL" />
    <Row>
      <Label>{I18n.t('with')}</Label>
      <Spacer orientation="row" size="L" />
      <View style={{ width: 50, marginTop: -22 }}>
        <TextField
          label=""
          value={capacity}
          onChange={(value) => { onChange({ fieldName: 'capacity', value }); }}
          theme="white"
          size="ML"
          inputContainerPadding={4}
          inputContainerStyle={{ paddingHorizontal: 8 }}
        />
      </View>
      <Spacer orientation="row" size="L" />
      <Label>{I18n.t('people')}</Label>
    </Row>
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

