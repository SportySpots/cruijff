import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, View, StyleSheet } from 'react-native';
import { cardList } from '../../Components/Spots/Styles/CardStyles';
import Footer from '../../Components/DarkFooter/index';
import CardSmall from '../../Components/Spots/SpotListCardSmall';
import Text from '../../Components/Text';
import withQuery from '../../GraphQL/withQuery';
import I18n from '../../I18n/index';
import GET_SPOTS from '../../GraphQL/Spots/Queries/GET_SPOTS';
import api from '../../Services/SeedorfApi';

const CardContainer = (props) => {
  const { onPress, ...otherProps } = props;
  return (
    <TouchableOpacity onPress={onPress} style={cardList.cardContainer}>
      <CardSmall {...otherProps} />
    </TouchableOpacity>
  );
};

class PickSpotComponent extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    data: PropTypes.shape({
      spots: PropTypes.array,
    }),
  };

  selectSpot = async (item) => {
    const result = await api.setGameSpot({
      gameUUID: this.props.navigation.state.params.uuid,
      spotUUID: item.uuid,
    });
    if (result.ok) {
      this.props.navigation.navigate('description', {
        uuid: this.props.navigation.state.params.uuid,
      });
    }
  };

  render() {
    const spots = this.props.data.spots.filter((spot) => {
      const sportUUIDs = spot.sports.map(sport => sport.uuid);
      return (sportUUIDs.indexOf(this.props.navigation.state.params.sportUUID) !== -1);
    });
    return (
      <View style={style.container}>
        <View style={[style.cardListContainer, this.props.style]}>
          <Text.L>{I18n.t('Pick a spot')}</Text.L>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={spots}
            renderItem={({ item }) => (
              <CardContainer spot={item} onPress={() => this.selectSpot(item)} />
            )}
            keyExtractor={item => item.uuid}
          />
        </View>
        <Footer
          currentPage={1}
          numPages={4}
          disableNext
          onBack={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

export default withQuery(GET_SPOTS)(PickSpotComponent);

const style = StyleSheet.create({
  cardListContainer: {
    padding: 8,
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 16,
  },
});
