import React from 'react';
import PropTypes from 'prop-types';
// import { propType } from 'graphql-anywhere';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
// import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import SportField from '../../Common/SportPickerField';
import DateField from '../../Common/DatePickerField';
import TimeField from '../../TimeField';
import TextField from '../../Common/TextField';
import { Title, Label, FormField } from '../style';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  flex: 1;
  background-color: ${Colors.primaryGreen};
  padding-top: 48px;
`;
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
  <Container>
    <KeyboardAwareScrollView>
      <Title>{I18n.t('Plan a game')}</Title>
      <FormField>
        <Label>{I18n.t('I want to play')}</Label>
        <SportField
          value={(sport && sport.name) || ''}
          onChange={(value) => { onChange({ fieldName: 'sport', value }); }}
        />
      </FormField>
      <FormField>
        <Label>{I18n.t('on')}</Label>
        <DateField
          value={date}
          onChange={(value) => { onChange({ fieldName: 'date', value }); }}
        />
      </FormField>
      <FormField>
        <Label>{I18n.t('from')}</Label>
        <TimeField
          value={time}
          onChange={(value) => { onChange({ fieldName: 'time', value }); }}
        />
        <Label>{I18n.t('to')}</Label>
        <TimeField
          value={duration}
          onChange={(value) => { onChange({ fieldName: 'duration', value }); }}
        />
      </FormField>
      <FormField>
        <Label>{I18n.t('with')}</Label>
        <TextField
          value={capacity}
          onBlur={(value) => { onChange({ fieldName: 'capacity', value }); }}
        />
        <Label> {I18n.t('people')}</Label>
      </FormField>
    </KeyboardAwareScrollView>
  </Container>
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

