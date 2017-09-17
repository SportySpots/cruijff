import React from "react";
import {FlatList, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {Toolbar} from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Card from "../Components/Cards/Card";

import SpotsActions from '../Redux/StartupRedux'

// import {Toolbar} from 'react-native-material-ui';

import styles from './Styles/SearchScreenStyles';

class SearchComponent extends React.Component {
  static defaultProps = {
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

  static propTypes = {
    getSpots: PropTypes.func,
    navigation: PropTypes.object,
    spots: PropTypes.array
  }

  onAddButtonPress = () => {
    this.props.navigator.navigate('newspot');
  };

  componentWillMount() {
    this.props.getSpots();
  }

  renderCard = ({item: spot}) => <Card key={spot._id['$oid']} style={styles.card} spot={spot}/>;

  getKey = (spot) => spot._id['$oid'];

  render() {
    return (
      <View style={{
        flex: 1
      }}>
        <Toolbar leftElement="menu" centerElement="Searchable" searchable={{
          autoFocus: true,
          placeholder: 'Search'
        }}/>

        <FlatList data={this.props.spots.slice(0, 20)} keyExtractor={this.getKey} renderItem={this.renderCard}/>

        <View style={styles.addButtonContainer}>
          <TouchableOpacity onPress={this.onAddButtonPress}>
            <Icon name="add" scale={3} color="red"/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const dispatchToProps = (dispatch) => ({
  // getSpots: () => dispatch(SpotsActions.getSpots()),
});

const mapStateToProps = (state) => ({spots: state.spots});

export default connect(mapStateToProps, dispatchToProps)(SearchComponent);
