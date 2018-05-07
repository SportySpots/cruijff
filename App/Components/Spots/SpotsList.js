import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, View, TouchableOpacity } from 'react-native'
import { cardList } from '../Spots/Styles/CardStyles'

const SpotsList = ({ data, cardComponent, onCardPress, style }) => (
  <View style={[cardList.container, style]}>
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data.spots}
      renderItem={({ item: spot }) => (
        <TouchableOpacity
          key={spot.uuid}
          onPress={() => {
            onCardPress(spot.uuid)
          }}
          style={cardList.cardContainer}
        >
          {React.createElement(cardComponent, { spot })}
        </TouchableOpacity>
      )}
      keyExtractor={item => item.uuid}
    />
  </View>
)

SpotsList.propTypes = {
  // TODO: use fragment instead!
  spots: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      address: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired
      }).isRequired
    }).isRequired
  ),
  cardComponent: PropTypes.func.isRequired,
  onCardPress: PropTypes.func,
  style: PropTypes.object
}

SpotsList.defaultProps = {
  spots: [],
  onCardPress: () => {},
  style: {}
}

export default SpotsList
