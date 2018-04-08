import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import AppNavigation from '../Navigation/AppNavigation'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.dispatch(StartupActions.startup())
    }
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <AppNavigation />
      </View>
    )
  }
}

const mapStateToProps = state => ({ nav: state.nav })

export default connect(mapStateToProps)(RootContainer)
