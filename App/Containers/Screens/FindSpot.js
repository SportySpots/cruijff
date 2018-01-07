import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { ActionButton, Toolbar } from 'react-native-material-ui'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Card from '../../Components/Cards/Card'
import NavigationBar from '../../Components/Navigation/NavigationBar'

import styles from './Styles/FindSpot'

class FindSpotScreen extends Component {
  onAddButtonPress () {
    console.tron.log(styles)
    this.props.navigation.navigate('LoginScreen')
  }

  componentWillMount () {
    this.props.getSpots()
  }

  renderCard ({item: spot}) { return <Card key={spot._id['$oid']} style={styles.card} spot={spot} /> }

  getKey (spot) { return spot._id['$oid'] }

  render () {
    return (
      <View style={{
        flex: 1
      }}>
        <Toolbar leftElement='menu' centerElement='Searchable' searchable={{
          autoFocus: true,
          placeholder: 'Search'
        }} />

        <FlatList data={this.props.spots.slice(0, 20)} keyExtractor={this.getKey} renderItem={this.renderCard} />

        <ActionButton onPress={this.onAddButtonPress} />

        <NavigationBar />
      </View>
    )
  }
}

const dispatchToProps = (dispatch) => ({
  // getSpots: () => dispatch(SpotsActions.getSpots()),
})

const mapStateToProps = (state) => ({spots: state.spots})

FindSpotScreen.defaultProps = {
  getSpots: () => {},
  spots: [
    {
      _id: {
        $oid: 1
      },
      name: 'Coole spot!'
    }, {
      _id: {
        $oid: 2
      },
      name: 'Nog een coole spot!'
    }
  ]
}

FindSpotScreen.propTypes = {
  getSpots: PropTypes.func,
  navigation: PropTypes.object,
  spots: PropTypes.array
}

export default connect(mapStateToProps, dispatchToProps)(FindSpotScreen)
