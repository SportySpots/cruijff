import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard } from 'react-native';
import { NavigationActions } from 'react-navigation';
import styled from 'styled-components';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from '../../../I18n';
import NavBarButton from './NavBarButton';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  height: 48;
  flex-direction: row;
  align-items: flex-end;
`;
//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const buttons = [{
  id: 'find',
  label: 'find',
  route: 'SpotSearchTab',
  icon: {
    set: MaterialIcon,
    name: 'search',
  },
}, {
  id: 'join',
  label: 'join',
  route: 'GameSearchTab',
  icon: {
    set: MaterialIcon,
    name: 'person-add',
  },
}, {
  id: 'organize',
  main: true,
  label: 'Organize',
  route: 'PlanScreen',
  icon: {
    set: MaterialCommunityIcon,
    name: 'calendar-plus',
  },
}, {
  id: 'profile',
  label: 'profile',
  route: 'ProfileTab',
  icon: {
    set: MaterialIcon,
    name: 'account-circle',
  },
}, {
  id: 'info',
  label: 'info',
  route: 'InfoTab',
  icon: {
    set: MaterialIcon,
    name: 'info',
  },
}];
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class NavBar extends React.Component {
  state = {
    keyboardActive: false,
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.handleKeyboard({ active: true }));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.handleKeyboard({ active: false }));
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  handleKeyboard = ({ active }) => {
    this.setState({ keyboardActive: active });
  };

  get curRoute() {
    const { navigation } = this.props;
    return navigation.state.routes[navigation.state.index].routeName;
  }

  handlePress = (btn) => {
    const { navigation } = this.props;
    if (this.curRoute !== btn.route) {
      // Go back to the begining of the stack
      navigation.popToTop();
      // Jump to the requested route.
      navigation.navigate({ routeName: btn.route });
    }
  };

  render() {
    const { keyboardActive } = this.state;

    if (keyboardActive) {
      return null;
    }

    return (
      <Container>
        {buttons.map(btn => (
          <NavBarButton
            key={btn.id}
            btnLabel={I18n.t(btn.label)}
            icon={btn.icon}
            active={this.curRoute === btn.route}
            main={!!btn.main}
            onPress={() => { this.handlePress(btn); }}
          />
        ))}
      </Container>
    );
  }
}

NavBar.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    popToTop: PropTypes.func.isRequired,
  }).isRequired,
};

export default NavBar;
