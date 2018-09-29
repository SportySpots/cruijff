import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import ClickableAttendees from '.';

const Box = styled.View`
  border: 1px solid black;
`;

const Container = ({ maxLength }) => (
  <Box>
    <Query
      query={GET_GAME_DETAILS}
      variables={{ uuid: 455 }}
    >
      {({ loading, error, data }) =>
        (loading || error ? null : (
          <ClickableAttendees
            game={data.game}
            maxLength={maxLength}
          />
        ))
      }
    </Query>
  </Box>
);

Container.propTypes = {
  maxLength: PropTypes.number,
};

Container.defaultProps = {
  maxLength: null,
};

storiesOf('Games.ClickableAttendees', module)
  .add('ClickableAttendees', () => <Container />)
  .add('ClickableAttendees maxLength 2', () => (
    <Container maxLength={2} />
  ));
