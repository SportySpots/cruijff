import React from 'react'
import { header } from './Styles/CardStyles'
import Int18n from '../../I18n'
import { View } from 'react-native'
import Text from '../Text'
import Rating from '../Rating'

const Spacer = () => <Text style={header.spacer}>·</Text>

const distance = 5

const Header = ({ spot, ...props }) => (
  <View {...props}>
    <Text.M>{spot.name}</Text.M>
    <View style={header.belowName}>
      <Rating rating={spot.rating || 4} />
      <Spacer />
      <Text.S>{Int18n.t(spot.sports[0].category)}</Text.S>
      <Spacer />
      <Text.S>5 km</Text.S>
      {spot.numGames > 0 && [
        <Spacer key={1} />,
        <Text.S key={2} style={header.plannedGamesCount}>
          {spot.numGames} {Int18n.t('games')}
        </Text.S>
      ]}
    </View>
  </View>
)

export default Header
