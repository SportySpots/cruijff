import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components/native';
import spotDetailsFragment from '../../../GraphQL/Spots/Fragments/spotDetails';
import Colors from '../../../Themes/Colors';
import Text from '../../Text';

const PropertyContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

const PropertyRow = styled.View`
  display: flex;
  padding: 8px;
  flex-direction: row;
  height: 40px;
  border-bottom-color: ${props => props.lineColor}
  border-bottom-width: 1px;
`;

const PropertyLabel = styled(Text.M)`
  flex: 1;
  font-weight: 400;
  color: ${props => props.textColor || '#000'};
  padding-horizontal: 20px;
`;

const PropertyValue = styled(Text.M)`
  flex: 1;
  font-weight: 500;
  color: ${props => props.textColor || '#000'};
`;

const SpotProperties = ({ spot, lineColor }) => {
  const properties = (
    spot.amenities &&
    spot.amenities.length > 0 &&
    spot.amenities[0] &&
    spot.amenities[0].data
  ) || {};

  return (
    <PropertyContainer>
      {Object.keys(properties).map(key => (
        <PropertyRow lineColor={lineColor} key={key}>
          <PropertyLabel>{key}</PropertyLabel>
          <PropertyValue>{properties[key]}</PropertyValue>
        </PropertyRow>
      ))}
    </PropertyContainer>
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
