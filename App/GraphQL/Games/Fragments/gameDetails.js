import gql from 'graphql-tag';

const gameDetailsFragment = gql`
  fragment gameDetailsFragment on GameType {
    uuid
    name
    status
    start_time
    end_time
    is_featured
    show_remaining
    capacity
    description
    invite_mode
    sport {
      uuid
      category
    }
    spot {
      uuid
      name
      images {
        uuid
        image
      }
      amenities {
        uuid
        #sport {
        #  uuid
        #  category
        #}
        data
      }
      sports {
        uuid
        category
      }
      address {
        uuid
        lat
        lng
      }
    }
    organizer {
      uuid
      first_name
      last_name
    }
    attendees {
      uuid
      status
      user {
        uuid
        first_name
        last_name
      }
    }
  }
`;

export default gameDetailsFragment;
