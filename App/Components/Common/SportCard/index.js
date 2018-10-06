import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { TouchableOpacity, Image } from 'react-native';
import I18n from '../../../I18n/index';
import themeIcons from '../../../Themes/Icons';
import Colors from '../../../Themes/Colors';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import Block from '../Block';
import Row from '../Row';
import Spacer from '../Spacer';
import Text from '../Text';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SportCard = ({ sport, isSelected, onPress }) => (
  <TouchableOpacity onPress={() => onPress(sport)}>
    <Block bgColor={isSelected ? Colors.grass20 : Colors.transparent}>
      <Row>
        <Image source={(
          sport && sport.category
            ? themeIcons[sport.category.toLowerCase()]
            : themeIcons.soccer
          )}
        />
        <Spacer orientation="row" size="XXL" />
        <Text.M>{I18n.t(sport.name)}</Text.M>
      </Row>
    </Block>
  </TouchableOpacity>
);

SportCard.propTypes = {
  sport: propType(sportFragment).isRequired,
  isSelected: PropTypes.bool,
  onPress: PropTypes.func,
};

SportCard.defaultProps = {
  isSelected: false,
  onPress: () => {},
};

export default SportCard;
