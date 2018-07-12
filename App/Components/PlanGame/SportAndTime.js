import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import styled from 'styled-components';
import Text from '../../Components/Text';
import I18n from '../../I18n/index';
import Colors from '../../Themes/Colors';
import SportField from './SportField';

const SportAndTime = ({
  sport,
  onChange,
}) => (
  <View style={styles.container}>
    <KeyboardAwareScrollView>
      <Text.L style={styles.title}>{I18n.t('Plan a game')}</Text.L>
      <View style={[styles.horizontal, { flex: 1, flexWrap: 'wrap' }]}>
        <Text.M style={styles.text}>{I18n.t('I want to play')}</Text.M>
        {/* <Field
          value={
            this.state.game.sport ? I18n.t(this.state.game.sport.name) : I18n.t('Select')
          }
          onPress={() => this.openModal('sport')}
        /> */}
        <SportField
          sport={sport}
          onChange={onChange}
        />
      </View>
    </KeyboardAwareScrollView>
  </View>
);

SportAndTime.propTypes = {
  sport: PropTypes.shape({
    name: PropTypes.string,
  }),
  onChange: PropTypes.func,
};

SportAndTime.defaultProps = {
  sport: {},
  onChange: () => {},
};

export default SportAndTime;

const styles = StyleSheet.create({
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
    /* fontSize: 48, */
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
});




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
