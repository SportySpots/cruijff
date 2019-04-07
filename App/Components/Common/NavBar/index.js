import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard } from 'react-native';
import firebase from 'react-native-firebase';
// import { NavigationActions } from 'react-navigation';
import styled from 'styled-components/native';
import I18n from '../../../I18n';
import Row from '../Row';
import NavBarButton from '../NavBarButton';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const StyledRow = styled(Row)`
  height: 48;
`;
//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const buttons = [{
  id: 'spots',
  label: 'navBar.spots',
  route: 'SpotSearchTab',
  icon: {
    set: 'MaterialCommunityIcons',
    name: 'compass',
  },
}, {
  id: 'activities',
  label: 'navBar.activities',
  route: 'GameSearchTab',
  icon: {
    set: 'MaterialIcons',
    name: 'people',
  },
}, {
  id: 'organize',
  main: true,
  label: 'navBar.organize',
  route: 'PlanScreen',
  icon: {
    set: 'MaterialCommunityIcons',
    name: 'soccer-field',
  },
}, {
  id: 'notifications',
  label: 'navBar.notifications',
  route: 'NotificationsTab',
  icon: {
    set: 'MaterialCommunityIcons',
    name: 'bell',
  },
}, {
  id: 'profile',
  label: 'navBar.profile',
  route: 'ProfileTab',
  icon: {
    set: 'MaterialIcons',
    name: 'account-circle',
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
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this.handleKeyboard({ active: true }));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this.handleKeyboard({ active: false }));
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
      firebase.analytics().logEvent(`navbar_btn_press_${btn.route}`);
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
      <StyledRow alignItems="flex-end">
        {buttons.map(btn => (
          <NavBarButton
            testID={`navbarButton_${btn.id}`}
            key={btn.id}
            btnLabel={I18n.t(btn.label)}
            icon={btn.icon}
            active={this.curRoute === btn.route}
            main={!!btn.main}
            onPress={() => { this.handlePress(btn); }}
          />
        ))}
      </StyledRow>
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
