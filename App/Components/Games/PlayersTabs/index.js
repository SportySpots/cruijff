import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Colors from '../../../Themes/Colors';
import I18n from '../../../I18n';
import userDetailsFragment from '../../../GraphQL/Users/Fragments/userDetails';
import Text from '../../Common/Text';
import PlayersList from '../PlayersList';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class PlayersTabs extends React.PureComponent {
  state = {
    index: 0,
    routes: [
      { key: 'attending', title: 'Attending' },
      { key: 'declining', title: 'Declining' },
    ],
  }

  render() {
    const { attendees, absents } = this.props;

    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          attending: () => <PlayersList players={attendees} />,
          declining: () => <PlayersList players={absents} />,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: 'pink' }}
          />
        )}
      />
    //   React.createElement(createMaterialTopTabNavigator({
    //     Attending: {
    //       screen: () => (
    //         <PlayersList players={attendees} />
    //       ),
    //       navigationOptions: {
    //         tabBarLabel: (
    //           <Text bold>
    //             {I18n.t('playersTabs.attending')}
    //           </Text>
    //         ),
    //       },
    //     },
    //     Declining: {
    //       screen: () => (
    //         <PlayersList players={absents} />
    //       ),
    //       navigationOptions: {
    //         tabBarLabel: (
    //           <Text bold>
    //             {I18n.t('playersTabs.declined')}
    //           </Text>
    //         ),
    //       },
    //     },
    //   }, {
    //     tabBarPosition: 'top',
    //     tabBarOptions: {
    //       style: {
    //         backgroundColor: Colors.white,
    //       },
    //       labelStyle: {
    //         color: 'black',
    //         fontWeight: '700',
    //       },
    //       indicatorStyle: {
    //         backgroundColor: Colors.primaryGreen,
    //         height: 4,
    //       },
    //     },
    //     initialRouteName: 'Attending',
    //   }))
    );
  }
}

PlayersTabs.propTypes = {
  attendees: PropTypes.arrayOf(
    PropTypes.shape({
      user: propType(userDetailsFragment),
      createdAt: PropTypes.instanceOf(Date),
    }),
  ),
  absents: PropTypes.arrayOf(
    PropTypes.shape({
      user: propType(userDetailsFragment),
      createdAt: PropTypes.instanceOf(Date),
    }),
  ),
};

PlayersTabs.defaultProps = {
  attendees: [],
  absents: [],
};

export default PlayersTabs;


// import React from 'react';
// import PropTypes from 'prop-types';
// import { propType } from 'graphql-anywhere';
// import { createMaterialTopTabNavigator } from 'react-navigation';
// import Colors from '../../../Themes/Colors';
// import I18n from '../../../I18n';
// import userDetailsFragment from '../../../GraphQL/Users/Fragments/userDetails';
// import Text from '../../Common/Text';
// import PlayersList from '../PlayersList';

// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// const PlayersTabs = ({ attendees, absents }) => (
//   React.createElement(createMaterialTopTabNavigator({
//     Attending: {
//       screen: () => (
//         <PlayersList players={attendees} />
//       ),
//       navigationOptions: {
//         tabBarLabel: (
//           <Text bold>
//             {I18n.t('playersTabs.attending')}
//           </Text>
//         ),
//       },
//     },
//     Declining: {
//       screen: () => (
//         <PlayersList players={absents} />
//       ),
//       navigationOptions: {
//         tabBarLabel: (
//           <Text bold>
//             {I18n.t('playersTabs.declined')}
//           </Text>
//         ),
//       },
//     },
//   }, {
//     tabBarPosition: 'top',
//     tabBarOptions: {
//       style: {
//         backgroundColor: Colors.white,
//       },
//       labelStyle: {
//         color: 'black',
//         fontWeight: '700',
//       },
//       indicatorStyle: {
//         backgroundColor: Colors.primaryGreen,
//         height: 4,
//       },
//     },
//     initialRouteName: 'Attending',
//   }))
// );

// PlayersTabs.propTypes = {
//   attendees: PropTypes.arrayOf(
//     PropTypes.shape({
//       user: propType(userDetailsFragment),
//       createdAt: PropTypes.instanceOf(Date),
//     }),
//   ),
//   absents: PropTypes.arrayOf(
//     PropTypes.shape({
//       user: propType(userDetailsFragment),
//       createdAt: PropTypes.instanceOf(Date),
//     }),
//   ),
// };

// PlayersTabs.defaultProps = {
//   attendees: [],
//   absents: [],
// };

// export default PlayersTabs;
