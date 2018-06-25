import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import spotDetailsFragment from '../../../GraphQL/Spots/Fragments/spotDetails';
import Colors from '../../../Themes/Colors';
import SpotMapWithLinkFallback from '../../../Components/Spots/SpotMapWithLinkFallback';
import Header from '../../../Components/Spots/Header';
// import SpotRating from './SpotRating';
import SpotImages from '../SpotImages';
import SpotProperties from './SpotProperties';
import SpotGames from './SpotGames';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled(ScrollView)`
  background-color: ${Colors.white};
`;
//------------------------------------------------------------------------------
const Block = styled.View`
  padding: 16px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotDetails = ({ spot, userId }) => ( // eslint-disable-line
  <Container>
    <SpotImages spot={spot} />
    <Block>
      <Header spot={spot} />
    </Block>
    {/* <SpotRating spot={spot} userId={userId} /> */}
    <SpotMapWithLinkFallback spot={spot} />
    <SpotProperties spot={spot} />
    <SpotGames spot={spot} />
  </Container>
);

SpotDetails.propTypes = {
  spot: propType(spotDetailsFragment).isRequired,
  userId: PropTypes.string,
};

SpotDetails.defaultProps = {
  userId: null,
};

export default SpotDetails;
