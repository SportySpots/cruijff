import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { View } from 'react-native';
import styled from 'styled-components';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
// import Rating from '../../Common/Rating';
import Text from '../../Common/Text';
import Row from '../../Common/Row';
import DotSpacer from '../../Common/DotSpacer';
import curatedGames from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Name = styled(Text.ML)`
  color: ${({ gray }) => (gray ? Colors.gray : Colors.black)}
`;
//------------------------------------------------------------------------------
const Category = styled(Text.SM)`
  color: ${({ gray }) => (gray ? Colors.gray : Colors.black)}
`;
//------------------------------------------------------------------------------
const Distance = styled(Text.SM)`
  color: ${({ gray }) => (gray ? Colors.gray : Colors.black)}
`;
//------------------------------------------------------------------------------
const Games = styled(Text.SM)`
  color: ${({ gray }) => (gray ? Colors.gray : Colors.actionYellow)}
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotHeader = ({
  spot,
  gray,
  withDistance,
  withGames,
}) => {
  const {
    name,
    sports,
    distance,
    games: rawGames,
  } = spot;

  // Filter passed games
  const games = (rawGames && curatedGames(rawGames)) || [];

  return (
    <View>
      <Name gray={gray} numberOfLines={1}>{name}</Name>
      <Row>
        {/* [
          <Rating key="rating" rating={spot.rating || 4} />,
          <DotSpacer key="spacer" />,
        ] */}
        {sports.map(({ category }, index) => [
          <Category key={category} gray={gray}>
            {I18n.t(category)}
          </Category>,
          // Don't add spacer in case it's the last item
          index !== sports.length - 1 && (
            <DotSpacer key={`spacer-${category}`} />
          ),
        ])}
        {withDistance && !!distance && [
          <DotSpacer key="spacer" />,
          <Distance key="distance" gray={gray}>
            {`${distance} KM`}
          </Distance>,
        ]}
        {withGames && !!games && games.length > 0 && [
          <DotSpacer key="spacer" />,
          <Games key="games" gray={gray}>
            {`${games.length} ${I18n.t('spotHeader.activities', { count: games.length }).toTitleCase()}`}
          </Games>,
        ]}
      </Row>
    </View>
  );
};

SpotHeader.propTypes = {
  spot: propType(spotFragment).isRequired,
  gray: PropTypes.bool,
  withDistance: PropTypes.bool,
  withGames: PropTypes.bool,
};

SpotHeader.defaultProps = {
  gray: false,
  withDistance: false,
  withGames: false,
};

export default SpotHeader;
