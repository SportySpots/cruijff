import React from 'react';
import { View } from 'react-native';
import { propType } from 'graphql-anywhere';
import Text from '../../../Components/Text';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import UserCircle from '../../../Components/UserCircle';
import { HorizontalView } from './style';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Organizer = ({ game }) => {
  const { organizer, description } = game;

  return (
    <HorizontalView>
      <UserCircle
        user={organizer}
        style={{ marginRight: 16 }}
      />
      <View style={{ flex: 1 }}>
        <Text.SM style={{ paddingTop: 11 }}>
          {organizer.first_name} {organizer.last_name} -{' '}
          {description || ''}
        </Text.SM>
      </View>
    </HorizontalView>
  );
};

Organizer.propTypes = {
  game: propType(gameDetailsFragment).isRequired,
};

export default Organizer;
