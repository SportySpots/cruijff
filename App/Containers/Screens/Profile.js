import React, { Component } from 'react'
import { View } from 'react-native'
import { Toolbar } from 'react-native-material-ui'
import { connect } from 'react-redux'

import NavigationBar from '../../Components/Navigation/NavigationBar'

class ProfileScreen extends Component {
  render () {
    return (
      <View style={{
        flex: 1
      }}>
        <Toolbar leftElement='menu' centerElement='Searchable' searchable={{
          autoFocus: true,
          placeholder: 'Search'
        }} />

        <NavigationBar />
      </View>
    )
  }
}

const dispatchToProps = (dispatch) => ({

})

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, dispatchToProps)(ProfileScreen)
