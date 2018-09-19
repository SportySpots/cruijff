import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { TouchableOpacity, Image } from 'react-native';
import I18n from '../../../I18n/index';
import themeIcons from '../../../Themes/Icons';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import Row from '../Row';
import Spacer from '../Spacer';
import Text from '../Text';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SportCard = ({ sport, onPress }) => (
  <TouchableOpacity onPress={() => onPress(sport)}>
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
  </TouchableOpacity>
);

SportCard.propTypes = {
  sport: propType(sportFragment).isRequired,
  onPress: PropTypes.func,
};

SportCard.defaultProps = {
  onPress: () => {},
};

export default SportCard;
