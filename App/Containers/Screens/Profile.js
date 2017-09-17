import React, { Component } from 'react';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActionButton, Toolbar } from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavigationBar from '../../Components/Navigation/NavigationBar';

import styles from './Styles/Profile';

class ProfileScreen extends Component {
  render() {
    return (
      <View style={{
        flex: 1
      }}>
        <Toolbar leftElement='menu' centerElement='Searchable' searchable={{
          autoFocus: true,
          placeholder: 'Search'
        }}/>

        <NavigationBar />
      </View>
    )
  }
}

const dispatchToProps = (dispatch) => ({

});

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, dispatchToProps)(ProfileScreen);
