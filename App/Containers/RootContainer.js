import React, { Component } from 'react'
import { StatusBar, View, BackHandler } from 'react-native'
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

    // handle android hardware back button
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { dispatch } = this.props
      dispatch({ type: 'Navigation/BACK' })
      return true
    })
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress')
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
