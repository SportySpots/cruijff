import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Footer from '../../Components/DarkFooter/index';
import CardSmall from '../../Components/Spots/SpotListCardSmall';
import { cardList } from '../../Components/Spots/Styles/CardStyles';
import Text from '../../Components/Text';
import withQuery from '../../GraphQL/withQuery';
import I18n from '../../I18n/index';
import api from '../../Services/SeedorfApi';
import { GET_SPOTS } from '../Spots/SpotsListScreen';

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
    return (
      <View style={style.container}>
        <View style={[style.cardListContainer, this.props.style]}>
          <Text.L>{I18n.t('Pick a spot')}</Text.L>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.props.data.spots.slice(0, 100)}
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
  },
});
