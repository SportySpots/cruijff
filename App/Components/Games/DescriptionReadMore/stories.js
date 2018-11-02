import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import Organizer from '.';

const Container = ({ textSize }) => (
  <Query
    query={GET_GAME_DETAILS}
    variables={{ uuid: 455 }}
  >
    {({ loading, error, data }) =>
      (loading || error ? null : (
        <Organizer
          organizer={data.game.organizer}
          textSize={textSize}
          description="Some dscription here \n Hola"
        />
      ))
    }
  </Query>
);

Container.propTypes = {
  textSize: PropTypes.string,
};

Container.defaultProps = {
  textSize: 'SM',
};

storiesOf('Games.Organizer', module)
  .add('Organizer S textSize', () => (
    <Container textSize="S" />
  ))
  .add('Organizer default textSize (SM)', () => (
    <Container />
  ))
  .add('Organizer M textSize', () => (
    <Container textSize="M" />
  ));

