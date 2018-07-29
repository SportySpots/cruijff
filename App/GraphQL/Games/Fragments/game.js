import gql from 'graphql-tag';

const gameFragment = gql`
  fragment gameFragment on GameType {
    uuid
    status
    name
    start_time
    end_time
    is_featured
    show_remaining
    capacity
    sport {
      uuid
      category
    }
    organizer {
      uuid
      first_name
      last_name
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

export default gameFragment;
