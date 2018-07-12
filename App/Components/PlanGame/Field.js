import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import Text from '../../Components/Text';
import withQuery from '../../GraphQL/withQuery';
import I18n from '../../I18n/index';
import Colors from '../../Themes/Colors';


const Field = ({ value, onPress }) => (
  <TouchableOpacity onPress={() => onPress && onPress()}>
    <View style={styles.fieldContainer}>
      <View style={styles.fieldBlock}>
        <Text.M style={styles.fieldValue}>{value}</Text.M>
      </View>
      <Icon size={24} name="keyboard-arrow-down" />
    </View>
  </TouchableOpacity>
);

export default Field;

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
