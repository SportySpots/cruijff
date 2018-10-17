import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { TouchableOpacity, Image } from 'react-native';
import I18n from '../../../I18n/index';
import themeIcons from '../../../Themes/Icons';
import Colors from '../../../Themes/Colors';
import Fonts from '../../../Themes/Fonts';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import Block from '../Block';
import Row from '../Row';
import Spacer from '../Spacer';
import Text from '../Text';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// 16 = padding from Block
export const SPORT_CARD_HEIGHT = (16 * 2) + (1.4 * Fonts.style.M.fontSize);
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SportCard = ({
  sport, isSelected, onPress, testID,
}) => (
  <TouchableOpacity onPress={() => onPress(sport)} testID={testID}>
    <Block bgColor={isSelected ? Colors.grass10 : Colors.transparent}>
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
  testID: PropTypes.string,
};

SportCard.defaultProps = {
  isSelected: false,
  onPress: () => {
  },
  testID: '',
};

export default SportCard;
