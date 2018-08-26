import gql from 'graphql-tag';

const gameOrganizerFragment = gql`
  fragment gameOrganizerFragment on GameType {
    uuid
    status
    organizer {
      uuid
    }
  }
`;

export default gameOrganizerFragment;
