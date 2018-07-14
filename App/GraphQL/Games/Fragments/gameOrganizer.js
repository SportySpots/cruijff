import gql from 'graphql-tag';

const gameOrganizerFragment = gql`
  fragment gameOrganizerFragment on GameType {
    uuid
    organizer {
      uuid
    }
  }
`;

export default gameOrganizerFragment;
