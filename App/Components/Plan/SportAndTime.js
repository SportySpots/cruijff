import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Calendar } from 'react-native-calendars'
import DateTimePicker from 'react-native-modal-datetime-picker'
import PropTypes from 'prop-types'

import Colors from '../../Themes/Colors'
import Text from '../Text'
import I18n from '../../I18n'
import Footer from '../DarkFooter/index'

const Field = ({ value, onPress }) => (
  <TouchableOpacity onPress={() => onPress && onPress()}>
    <View style={styles.fieldContainer}>
      <View style={styles.fieldBlock}>
        <Text.M style={styles.fieldValue}>{value}</Text.M>
      </View>
      <Icon size={24} name='keyboard-arrow-down' />
    </View>
  </TouchableOpacity>
)

const SportModal = ({ visible, onSelect }) => (
  <Modal
    visible={visible}
    animationType={'fade'}
    onRequestClose={() => onSelect(null)}
    transparent
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalInnerContainer}>
        <Text.L>{I18n.t('Choose sport')}</Text.L>
        <FlatList
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onSelect(item)}>
              <Text.M>{I18n.t(item)}</Text.M>
            </TouchableOpacity>
          )}
          data={['Football', 'Basketball', 'Tennis']}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: Colors.black54 }} />
          )}
        />
      </View>
    </View>
  </Modal>
)

const DateModal = ({ visible, onSelect }) => (
  <Modal
    visible={visible}
    animationType={'fade'}
    onRequestClose={() => onSelect(null)}
    transparent
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalInnerContainer}>
        <Text.L>{I18n.t('Select a date')}</Text.L>
        <Calendar
          current={new Date().toISOString().slice(0, 10)}
          minDate={new Date().toISOString().slice(0, 10)}
          onDayPress={day => onSelect(day.dateString)}
        />
      </View>
    </View>
  </Modal>
)

const timeStringToDate = timeString => {
  const date = new Date()
  date.setHours(timeString.split(':')[0])
  date.setMinutes(timeString.split(':')[1])
  return date
}

const dateStringToTimeString = dateString => {
  const date = new Date(dateString)
  return (
    (date.getHours() < 10 ? '0' : '') +
    date.getHours() +
    ':' +
    (date.getMinutes() < 10 ? '0' : '') +
    date.getMinutes()
  )
}

export default class SportAndTime extends Component {
  static propTypes = {
    navigation: PropTypes.any, // Plan flow navigation
    navigate: PropTypes.func, // Main screen navigation
    setGameDetailField: PropTypes.func,
    gameDetails: PropTypes.shape({
      sport: PropTypes.string,
      date: PropTypes.string,
      startTime: PropTypes.string,
      stopTime: PropTypes.string,
      spotId: PropTypes.number,
      description: PropTypes.string,
      isPublic: PropTypes.bool
    })
  }

  state = {
    modals: {
      sport: false,
      date: false,
      timeStart: false,
      timeEnd: false
    }
  }
  openModal (modalName) {
    this.setState({ modals: { ...this.state.modals, [modalName]: true } })
  }
  closeModal (modalName) {
    this.setState({ modals: { ...this.state.modals, [modalName]: false } })
  }

  onBack = () => {
    this.props.navigate({ routeName: 'SpotSearchTab' })
  }

  onNext = () => {
    this.props.navigation.navigate('pickSpot')
  }

  render () {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <SportModal
            visible={this.state.modals.sport}
            value={this.props.gameDetails.sport}
            onSelect={sport => {
              this.closeModal('sport')
              this.props.setGameDetailField('sport', sport)
            }}
          />
          <DateModal
            visible={this.state.modals.date}
            onSelect={date => {
              this.closeModal('date')
              this.props.setGameDetailField('date', date)
            }}
          />
          <DateTimePicker
            mode='time'
            isVisible={this.state.modals.timeStart}
            date={
              this.state.timeStart &&
              timeStringToDate(this.props.gameDetails.timeStart)
            }
            onConfirm={date => {
              this.props.setGameDetailField(
                'timeStart',
                dateStringToTimeString(date)
              )
              this.closeModal('timeStart')
            }}
            onCancel={() => {
              this.closeModal('timeStart')
            }}
          />
          <DateTimePicker
            mode='time'
            isVisible={this.state.modals.timeEnd}
            date={
              this.state.timeEnd &&
              timeStringToDate(this.props.gameDetails.timeEnd)
            }
            onConfirm={date => {
              this.props.setGameDetailField(
                'timeEnd',
                dateStringToTimeString(date)
              )
              this.closeModal('timeEnd')
            }}
            onCancel={() => {
              this.closeModal('timeEnd')
            }}
          />

          <Text.L style={styles.title}>{I18n.t('Plan a game')}</Text.L>
          <View style={styles.horizontal}>
            <Text.M style={styles.text}>I want to play</Text.M>
            <Field
              value={this.props.gameDetails.sport || 'Select'}
              onPress={() => this.openModal('sport')}
            />
          </View>
          <View style={styles.horizontal}>
            <Text.M style={styles.text}>{I18n.t('on')}</Text.M>
            <Field
              value={this.props.gameDetails.date || 'Select'}
              onPress={() => this.openModal('date')}
            />
          </View>
          <View style={styles.horizontal}>
            <Text.M style={styles.text}>{I18n.t('from')}</Text.M>
            <Field
              value={this.props.gameDetails.timeStart || 'Select'}
              onPress={() => this.openModal('timeStart')}
            />
            <Text.M style={styles.text}>{I18n.t('to')}</Text.M>
            <Field
              value={this.props.gameDetails.timeEnd || 'Select'}
              onPress={() => this.openModal('timeEnd')}
            />
          </View>
        </View>
        <Footer
          numPages={4}
          currentPage={0}
          onBack={this.onBack}
          onNext={this.onNext}
          disableNext={
            !this.props.gameDetails.timeStart ||
            !this.props.gameDetails.timeEnd ||
            !this.props.gameDetails.sport ||
            !this.props.gameDetails.date
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1
  },
  container: {
    backgroundColor: Colors.primaryGreen,
    flex: 1,
    padding: 32
  },
  horizontal: {
    flexDirection: 'row',
    marginVertical: 16,
    alignItems: 'center'
  },
  title: {
    color: Colors.white,
    marginBottom: 32,
    fontSize: 48
  },
  text: {
    color: Colors.white,
    fontSize: 24
  },
  fieldContainer: {
    marginHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  fieldBlock: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
    paddingHorizontal: 8
  },
  fieldValue: {
    fontSize: 28
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.8)'
  },
  modalInnerContainer: {
    backgroundColor: Colors.white,
    flex: 1,
    margin: 36,
    padding: 8
  }
})
