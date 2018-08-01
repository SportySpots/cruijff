import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, View, StyleSheet } from 'react-native';
import { cardList } from '../../Components/Spots/Styles/CardStyles';
import Footer from '../../Components/DarkFooter/index';
import CardSmall from '../../Components/Spots/SpotListCardSmall';
import Text from '../../Components/Common/Text';
import withQuery from '../../GraphQL/withQuery';
import I18n from '../../I18n/index';
import { GET_SPOTS_FOR_SPORT } from '../../GraphQL/Spots/Queries/GET_SPOTS';
import api from '../../Services/SeedorfApi';
import NothingFound from '../../Components/NothingFound';

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
    const spots = this.props.data.spots;

    let Contents = (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={spots}
        renderItem={({ item }) => (
          <CardContainer spot={item} onPress={() => this.selectSpot(item)} />
        )}
        keyExtractor={item => item.uuid}
      />
    );

    if (!spots || spots.length === 0) {
      Contents = <NothingFound icon="map-marker" text={I18n.t('No spots found')} />;
    }

    return (
      <View style={style.container}>
        <View style={[style.cardListContainer, this.props.style]}>
          <Text.L>{I18n.t('Pick a spot')}</Text.L>
          {Contents}
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


export default (props) => {
  const Comp = withQuery(GET_SPOTS_FOR_SPORT)(PickSpotComponent);
  return (<Comp
    {...props}
    variables={{
      limit: 1000,
      offset: 0,
      sport: props.navigation.state.params.sportCategory.toLowerCase(),
    }}
  />);
};

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
