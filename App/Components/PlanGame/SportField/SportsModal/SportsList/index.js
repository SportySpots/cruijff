import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import Colors from '../../../../../Themes/Colors';
import SportCard from './SportCard';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Separator = styled.View`
  height: 1;
  background-Color: ${Colors.black54};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SportsList = ({ sports, onSelect }) => (
  <FlatList
    keyExtractor={item => item.uuid}
    renderItem={({ item }) => (
      <SportCard
        sport={item}
        onSelect={onSelect}
      />
    )}
    data={sports}
    ItemSeparatorComponent={() => (<Separator />)}
    // or {Separator}
  />
);

SportsList.propTypes = {
  sports: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }).isRequired,
  ),
  onSelect: PropTypes.func,
};

SportsList.defaultProps = {
  sports: [],
  onSelect: () => {},
};

export default SportsList;
