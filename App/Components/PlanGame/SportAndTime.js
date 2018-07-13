import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components';
import I18n from '../../I18n';
import Colors from '../../Themes/Colors';
import sportFragment from '../../GraphQL/Sports/Fragments/sport';
import SportField from './SportField';
import DateField from './DateField';
import { Title, Label, FormField } from './style';

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
  start_time,
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
          value={start_time}
          onChange={(value) => { onChange({ fieldName: 'start_time', value }); }}
        />
      </FormField>
    </KeyboardAwareScrollView>
  </Container>
);

SportAndTime.propTypes = {
  sport: propType(sportFragment),
  start_time: PropTypes.string,
  onChange: PropTypes.func,
};

SportAndTime.defaultProps = {
  sport: null,
  start_time: '',
  onChange: () => {},
};

export default SportAndTime;

/* const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    height: '100%',
  },
  container: {
    backgroundColor: Colors.primaryGreen,
    flex: 1,
    paddingTop: 48,
  },
  horizontal: {
    flexDirection: 'row',
    marginVertical: 16,
    alignItems: 'center',
  },
  title: {
    color: Colors.white,
    marginBottom: 32,
    /* fontSize: 48, /
  },
  text: {
    color: Colors.white,
    fontSize: 24,
  },
  fieldContainer: {
    marginHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldBlock: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
    paddingHorizontal: 8,
  },
  fieldValue: {
    fontSize: 28,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.8)',
  },
  modalInnerContainer: {
    backgroundColor: Colors.white,
    flex: 1,
    margin: 36,
    padding: 8,
  },
}); */




/* <View style={{ paddingHorizontal: 16 }}>
  <SportModal
    visible={this.state.modals.sport}
    value={this.state.game.sport}
    onSelect={this.setSport}
  />
  <DateModal
    game={this.state.game}
    visible={this.state.modals.date}
    onSelect={this.setDate}
  />
  <DateTimePicker
    mode="time"
    isVisible={this.state.modals.timeStart}
    date={
      this.state.game.timeStart
        ? timeStringToDate(this.state.game.start_time)
        : timeStringToDate('12:00')
    }
    onConfirm={this.setStartTime}
    onCancel={() => {
      this.closeModal('timeStart');
    }}
  />
  <DateTimePicker
    mode="time"
    isVisible={this.state.modals.timeEnd}
    date={
      this.state.game.timeEnd
        ? timeStringToDate(this.state.game.end_time)
        : timeStringToDate('12:00')
    }
    onConfirm={this.setEndTime}
    onCancel={() => {
      this.closeModal('timeEnd');
    }}
  /> */



/* <View style={styles.horizontal}>
  <Text.M style={styles.text}>{I18n.t('on')}</Text.M>
  <Field
    value={moment(this.state.game.start_time).format('DD-MM') || I18n.t('Select')}
    onPress={() => this.openModal('date')}
  />
</View>
<View style={styles.horizontal}>
  <Text.M style={styles.text}>{I18n.t('from')}</Text.M>
  <Field
    value={moment(this.state.game.start_time).format('HH:mm') || I18n.t('Select')}
    onPress={() => this.openModal('timeStart')}
  />
  <Text.M style={styles.text}>{I18n.t('to')}</Text.M>
  <Field
    value={moment(this.state.game.end_time).format('HH:mm') || I18n.t('Select')}
    onPress={() => this.openModal('timeEnd')}
  />
</View>
<View style={styles.horizontal}>
  <Text.M style={styles.text}>{I18n.t('with')}</Text.M>
  <TextInput
    ref={ref => this.capacityField = ref }
    keyboardType="numeric"
    underlineColorAndroid={Colors.white}
    style={{ flex: 0.20, fontSize: 24, marginLeft: 8 }}
    defaultValue={this.state.game.capacity}
    onChangeText={val => this.setState({ capacityField: val })}
    onBlur={this.setCapacity}
  />
  <Text.M style={styles.text}> {I18n.t('people')}</Text.M>
</View>
</View> */
