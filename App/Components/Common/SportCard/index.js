import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { TouchableOpacity, Image } from 'react-native';
import I18n from '../../../I18n';
import themeIcons from '../../../Themes/Icons';
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
export const SPORT_CARD_HEIGHT = (16 * 2) + (1.4 * Fonts.M.fontSize);
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SportCard = ({
  sport,
  isSelected,
  onPress,
  testID,
}) => (
  <TouchableOpacity
    onPress={() => { onPress(sport); }}
    testID={testID}
  >
    <Block bgColor={isSelected ? 'grass10' : 'transparent'}>
      <Row>
        <Image source={(
          sport && sport.category
            ? themeIcons[sport.category.toLowerCase()]
            : themeIcons.soccer
        )}
        />
        <Spacer row size="XXL" />
        <Text size="M">{I18n.t(sport.category)}</Text>
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
  onPress: () => {},
  testID: '',
};

export default SportCard;
