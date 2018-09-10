import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { TouchableOpacity, Image } from 'react-native';
import I18n from '../../../I18n/index';
import themeIcons from '../../../Themes/Icons';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import Row from '../Row';
import Block from '../Block';
import Spacer from '../Spacer';
import Text from '../Text';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SportCard = ({ sport, onSelect }) => (
  <TouchableOpacity onPress={() => onSelect(sport)}>
    <Block>
      <Row>
        <Image source={(
          sport && sport.category
            ? themeIcons[sport.category.toLowerCase()]
            : themeIcons.soccer
          )}
        />
        <Spacer direction="row" size="XL" />
        <Text.M>{I18n.t(sport.name)}</Text.M>
      </Row>
    </Block>
  </TouchableOpacity>
);

SportCard.propTypes = {
  sport: propType(sportFragment).isRequired,
  onSelect: PropTypes.func,
};

SportCard.defaultProps = {
  onSelect: () => {},
};

export default SportCard;
