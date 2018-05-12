import * as React from 'react';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Text from '../Text';
import { View } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';

const months = [...Array(12).keys()];
const monthName = month => moment(`2000-${(`0${month + 1}`).slice(-2)}-01`).format('MMMM');

export default class MonthSelector extends React.Component {
  static propTypes: {
    month: PropTypes.number.required,
    onChange: PropTypes.func.required,
    style: View.propTypes,
  };

  render() {
    return (
      <View style={this.props.style}>
        <Menu name="popup">
          <MenuTrigger menuName="popup" style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcon size={24} name="menu" />
            <Text.M> {monthName(this.props.month)}</Text.M>
          </MenuTrigger>
          <MenuOptions>
            {months.map(month => (
              <MenuOption key={month} onSelect={() => this.props.onChange(month)}>
                <Text.M>{monthName(month)}</Text.M>
              </MenuOption>
            ))}
          </MenuOptions>
        </Menu>
      </View>
    );
  }
}
