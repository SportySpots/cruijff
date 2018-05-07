import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Calendar } from 'react-native-calendars'
import DateTimePicker from 'react-native-modal-datetime-picker'
import PropTypes from 'prop-types'

import Colors from '../../Themes/Colors'
import Text from '../../Components/Text'
import I18n from '../../I18n/index'
import Footer from '../../Components/DarkFooter/index'
import api from '../../Services/SeedorfApi'
import { client } from '../../GraphQL/index'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import moment from 'moment'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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

const SportModal = props => (
  <Query
    query={gql`
      {
        sports {
          uuid
          name
        }
      }
    `}
  >
    {({ data, loading, error }) => {
      if (error || loading) {
        return null
      } else return <_SportModal {...props} data={data} />
    }}
  </Query>
)

const _SportModal = ({ visible, onSelect, data }) => (
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
          keyExtractor={item => item.uuid}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onSelect(item)}>
              <Text.M>{I18n.t(item.name)}</Text.M>
            </TouchableOpacity>
          )}
          data={data.sports}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: Colors.black54 }} />
          )}
        />
      </View>
    </View>
  </Modal>
)

const DateModal = ({ game, visible, onSelect }) => (
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
  const hours = timeString.split(':')[0]
  const minutes = timeString.split(':')[1]
  return new Date(Date.UTC(2016, 6, 6, hours, minutes, 0))
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
    navigation: PropTypes.any // Plan flow navigation
  }
  constructor (props) {
    super(props)
    this.state = {
      modals: {
        sport: false,
        date: false,
        timeStart: false,
        timeEnd: false
      },
      capacityField: '',
      game: null
    }
    this.refreshGame()
  }

  shouldComponentUpdate () {
    return true
  }

  get gameUUID () {
    return this.props.navigation.state.params.uuid
  }

  refreshGame = async () => {
    try {
      const result = await client.query({
        query: gql`
          {
            game(uuid: "${this.gameUUID}") {
              start_time
              end_time
              sport { uuid, name }
              capacity
            }
          }
        `
      })
      this.setState({
        game: result.data.game,
        capacityField: result.data.game.capacity
      })
    } catch (e) {
      console.log(e)
    }
  }

  openModal (modalName) {
    this.setState({ modals: { ...this.state.modals, [modalName]: true } })
  }
  closeModal (modalName) {
    this.setState({ modals: { ...this.state.modals, [modalName]: false } })
  }

  onBack = () => {
    // https://github.com/react-navigation/react-navigation/issues/697#issuecomment-309359044
    this.props.navigation.goBack(null)
  }

  onNext = () => {
    this.props.navigation.navigate('pickSpot', {
      uuid: this.gameUUID
    })
  }

  setSport = async sport => {
    this.closeModal('sport')
    // request goes through, but response is unexpected from the perspective of Apollo Client
    try {
      const result = await api.setGameSport({
        gameUUID: this.gameUUID,
        sport: sport
      })
    } catch (e) {
      console.log(e)
    }
    this.setState({ game: { ...this.state.game, sport: sport } })
  }

  setDate = async date => {
    this.closeModal('date')
    const startTime = moment(
      date + 'T' + moment(this.state.game.start_time).format('HH:mm:ss')
    ).toISOString()
    const endTime = moment(
      date + 'T' + moment(this.state.game.end_time).format('HH:mm:ss')
    ).toISOString()
    const result = await api.setGameTimes({
      gameUUID: this.gameUUID,
      startTime: startTime,
      endTime: endTime
    })
    if (result.ok) {
      this.setState({
        game: {
          ...this.state.game,
          start_time: startTime,
          end_time: endTime
        }
      })
    }
  }

  setStartTime = async date => {
    this.closeModal('timeStart')
    const timeString = dateStringToTimeString(date) + ':00'
    const startTime = moment(
      moment(this.state.game.start_time).format('YYYY-MM-DD') + 'T' + timeString
    ).toISOString()
    const result = await api.setGameTimes({
      gameUUID: this.gameUUID,
      startTime: startTime,
      endTime: this.state.game.end_time
    })
    if (result.ok) {
      this.setState({
        game: { ...this.state.game, start_time: startTime }
      })
    }
  }

  setEndTime = async date => {
    this.closeModal('timeEnd')
    const timeString = dateStringToTimeString(date) + ':00'
    const endTime = moment(
      moment(this.state.game.end_time).format('YYYY-MM-DD') + 'T' + timeString
    ).toISOString()
    const result = await api.setGameTimes({
      gameUUID: this.gameUUID,
      endTime: endTime,
      startTime: this.state.game.start_time
    })
    if (result.ok) {
      this.setState({
        game: { ...this.state.game, end_time: endTime }
      })
    }
  }

  setCapacity = async () => {
    const result = await api.setGameCapacity({
      gameUUID: this.gameUUID,
      capacity: this.state.capacityField
    })
    if (result.ok) {
      this.setState({
        game: { ...this.state.game, capacity: this.state.capacityField }
      })
    }
  }

  render () {
    if (!this.state.game) {
      return null
    }
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={{ paddingHorizontal: 16 }}>
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
              mode='time'
              isVisible={this.state.modals.timeStart}
              date={
                this.state.game.timeStart
                  ? timeStringToDate(this.state.game.start_time)
                  : timeStringToDate('12:00')
              }
              onConfirm={this.setStartTime}
              onCancel={() => {
                this.closeModal('timeStart')
              }}
            />
            <DateTimePicker
              mode='time'
              isVisible={this.state.modals.timeEnd}
              date={
                this.state.game.timeEnd
                  ? timeStringToDate(this.state.game.end_time)
                  : timeStringToDate('12:00')
              }
              onConfirm={this.setEndTime}
              onCancel={() => {
                this.closeModal('timeEnd')
              }}
            />

            <Text.L style={styles.title}>{I18n.t('Plan a game')}</Text.L>
            <View style={styles.horizontal}>
              <Text.M style={styles.text}>{I18n.t('I want to play')}</Text.M>
              <Field
                value={
                  this.state.game.sport
                    ? I18n.t(this.state.game.sport.name)
                    : I18n.t('Select')
                }
                onPress={() => this.openModal('sport')}
              />
            </View>
            <View style={styles.horizontal}>
              <Text.M style={styles.text}>{I18n.t('on')}</Text.M>
              <Field
                value={
                  moment(this.state.game.start_time).format('DD-MM') ||
                  I18n.t('Select')
                }
                onPress={() => this.openModal('date')}
              />
            </View>
            <View style={styles.horizontal}>
              <Text.M style={styles.text}>{I18n.t('from')}</Text.M>
              <Field
                value={
                  moment(this.state.game.start_time).format('HH:mm') ||
                  I18n.t('Select')
                }
                onPress={() => this.openModal('timeStart')}
              />
              <Text.M style={styles.text}>{I18n.t('to')}</Text.M>
              <Field
                value={
                  moment(this.state.game.end_time).format('HH:mm') ||
                  I18n.t('Select')
                }
                onPress={() => this.openModal('timeEnd')}
              />
            </View>
            <View style={styles.horizontal}>
              <Text.M style={styles.text}>{I18n.t('capacity')}</Text.M>
              <TextInput
                keyboardType='numeric'
                underlineColorAndroid={Colors.white}
                style={{ fontSize: 24, marginLeft: 8 }}
                defaultValue={this.state.game.capacity}
                onChangeText={val => this.setState({ capacityField: val })}
                onBlur={this.setCapacity}
              />
              <Icon size={24} name='keyboard-arrow-down' />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <Footer
          numPages={4}
          currentPage={0}
          onBack={this.onBack}
          onNext={this.onNext}
          disableNext={
            !this.state.game.start_time ||
            !this.state.game.end_time ||
            !this.state.game.sport
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    height: '100%'
  },
  container: {
    backgroundColor: Colors.primaryGreen,
    flex: 1
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
