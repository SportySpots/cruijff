import React from 'react';
import { Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import Colors from '../../../Themes/Colors';
import I18n from '../../../I18n';
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
      { key: 'declined', title: 'Declined' },
    ],
  }

  handleIndexChange = (index) => {
    this.setState({ index });
  }

  render() {
    const { attendees, absents } = this.props;
    const { index, routes } = this.state;

    return (
      <TabView
        navigationState={{ index, routes }}
        renderScene={({ route }) => {
          switch (route.key) {
            case 'attending':
              return <PlayersList players={attendees} />;
            case 'declined':
              return <PlayersList players={absents} />;
            default:
              return null;
          }
        }}
        onIndexChange={this.handleIndexChange}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{
              backgroundColor: Colors.primaryGreen,
              height: 4,
            }}
            style={{
              backgroundColor: Colors.white,
            }}
            renderLabel={({ route }) => (
              <Text bold>
                {I18n.t(`playersTabs.${route.key}`)}
              </Text>
            )}
          />
        )}
      />
    );
  }
}

PlayersTabs.propTypes = {
  attendees: PlayersList.propTypes.players,
  absents: PlayersList.propTypes.players,
};

PlayersTabs.defaultProps = {
  attendees: [],
  absents: [],
};

export default PlayersTabs;
