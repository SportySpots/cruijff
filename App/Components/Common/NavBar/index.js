import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard } from 'react-native';
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
  // route: 'PlanGameNav',
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
  }).isRequired,
};

export default NavBar;

/*
import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard } from 'react-native';
import styled from 'styled-components';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
import NavBarButton from './NavBarButton';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  height: 56;
  margin-top: -8px;
  /* position: relative; //
  flex-direction: row;
  align-items: flex-end;
  /* background-color: ${Colors.transparent}; //
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
  route: 'PlanGameNav',
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
  }).isRequired,
};

export default NavBar;
*/
/*
import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard } from 'react-native';
import styled from 'styled-components';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
import NavBarButton from './NavBarButton';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  height: 56;
  margin-top: -8px;
  position: relative;
  flex-direction: row;
  align-items: flex-end;
  background-color: ${Colors.transparent};
`;
//------------------------------------------------------------------------------
const Button = styled.View`
  flex: ${props => (props.main ? 11 : 9)};
  height: ${props => (props.main ? 56 : 48)};
  border-top-left-radius: ${props => (props.main ? 8 : 0)};
  border-top-right-radius: ${props => (props.main ? 8 : 0)};
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
  route: 'PlanGameNav',
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
          <Button key={btn.id} main={!!btn.main}>
            <NavBarButton
              btnLabel={I18n.t(btn.label)}
              icon={btn.icon}
              active={this.curRoute === btn.route}
              main={!!btn.main}
              onPress={() => { this.handlePress(btn); }}
            />
          </Button>
        ))}
      </Container>
    );
  }
}

NavBar.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default NavBar;
*/

/*
import React from 'react';
import I18n from '../I18n';
import { View, Keyboard, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import NavBarButton from './NavBarButton';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../Themes/Colors';

import api from '../Services/SeedorfApi';
import { connect } from 'react-redux';

const buttons = [
  {
    buttonText: 'find',
    navigate: 'SpotSearchTab',
    icon: {
      set: MaterialIcon,
      name: 'search',
    },
  },
  {
    buttonText: 'join',
    navigate: 'GameSearchTab',
    icon: {
      set: MaterialIcon,
      name: 'person-add',
    },
  },
  {
    buttonText: 'Organize',
    async onPress() {
      // called with this = NavBar component
      if (!this.props.user.claims.uuid) {
        const activeRoute = this.props.navigation.state.routes[this.props.navigation.state.index];
        if (activeRoute.routeName !== 'ProfileTab') {
          this.props.navigation.navigate('ProfileTab');
        }
        return;
      }

      const result = await api.createGame({
        name: `${this.props.user.claims.username}'s game`,
      });
      if (result.ok) {
        this.props.navigation.navigate('PlanScreen', {
          uuid: result.data.uuid,
        });
      }
    },
    icon: {
      set: MaterialCommunityIcon,
      name: 'calendar-plus',
    },
    main: true,
  },
  {
    buttonText: 'profile',
    navigate: 'ProfileTab',
    icon: {
      set: MaterialIcon,
      name: 'account-circle',
    },
  },
  {
    buttonText: 'info',
    navigate: 'InfoTab',
    icon: {
      set: MaterialIcon,
      name: 'info',
    },
  },
];

export class _NavBar extends React.Component {
  static propTypes = {
    buttonText: PropTypes.string,
    navigation: PropTypes.any, // react-navigation object
    user: PropTypes.object,
  };

  static defaultProps = {};

  constructor() {
    super();
    this.state = { keyboardActive: false };
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({ keyboardActive: true });
  };

  _keyboardDidHide = () => {
    this.setState({ keyboardActive: false });
  };

  onButtonPress = (button) => {
    if (button.onPress) {
      button.onPress.call(this);
    } else {
      const activeRoute = this.props.navigation.state.routes[this.props.navigation.state.index];
      if (activeRoute.routeName !== button.navigate) {
        this.props.navigation.navigate({ routeName: button.navigate });
      }
    }
  };

  render() {
    if (this.state.keyboardActive) {
      return null;
    }
    return (
      <View style={navbarStyle.container}>
        {buttons.map((button, index) => (
          <View
            key={index}
            style={button.main ? navbarStyle.mainButtonContainer : navbarStyle.buttonContainer}
          >
            <NavBarButton
              onPress={() => this.onButtonPress(button)}
              icon={button.icon}
              buttonText={I18n.t(button.buttonText)}
              active={
                this.props.navigation &&
                this.props.navigation.state.routes[this.props.navigation.state.index].routeName ===
                  button.navigate
              }
              main={!!button.main}
            />
          </View>
        ))}
      </View>
    );
  }
}

const NavBar = connect(state => ({ user: state.user }))(_NavBar);
export default NavBar;

const navbarStyle = StyleSheet.create({
  container: {
    height: 56,
    marginTop: -8,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: Colors.transparent,
  },
  buttonContainer: {
    flex: 9,
    height: 48,
  },
  mainButtonContainer: {
    flex: 11,
    height: 56,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});

*/
