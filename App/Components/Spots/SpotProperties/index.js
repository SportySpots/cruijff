import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components/native';
import spotDetailsFragment from '../../../GraphQL/Spots/Fragments/spotDetails';
import Colors from '../../../Themes/Colors';
import Text from '../../Common/Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  display: flex;
  flex-direction: column;
`;
//------------------------------------------------------------------------------
const Row = styled.View`
  display: flex;
  padding: 8px;
  flex-direction: row;
  height: 40px;
  border-bottom-color: ${props => props.lineColor}
  border-bottom-width: 1px;
`;
//------------------------------------------------------------------------------
const Label = styled(Text.M)`
  flex: 1;
  font-weight: 400;
  color: ${props => props.textColor || '#000'};
  padding-horizontal: 20px;
`;
//------------------------------------------------------------------------------
const Value = styled(Text.M)`
  flex: 1;
  font-weight: 500;
  color: ${props => props.textColor || '#000'};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotProperties = ({ spot, lineColor }) => {
  const properties = (
    spot.amenities &&
    spot.amenities.length > 0 &&
    spot.amenities[0] &&
    spot.amenities[0].data
  ) || {};

  return (
    <Container>
      {Object.keys(properties).map(key => (
        <Row lineColor={lineColor} key={key}>
          <Label>{key}</Label>
          <Value>{properties[key]}</Value>
        </Row>
      ))}
    </Container>
  );
};

SpotProperties.propTypes = {
  spot: propType(spotDetailsFragment).isRequired,
  lineColor: PropTypes.string,
};

SpotProperties.defaultProps = {
  lineColor: Colors.lightGray,
};

export default SpotProperties;
