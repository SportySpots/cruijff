import gql from 'graphql-tag';

const gameDetailsFragment = gql`
  fragment gameDetailsFragment on GameType {
    uuid
    name
    status
    start_timezone
    start_time
    end_timezone
    end_time
    is_featured
    show_remaining
    capacity
    description
    invite_mode
    sport {
      id
      uuid
      category
    }
    spot {
      id
      uuid
      name
      images {
        uuid
        image
      }
      games {
        uuid
        start_time
        status
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
      profile {
        avatar
      }
    }
    attendees {
      uuid
      status
      user {
        uuid
        first_name
        last_name
        profile {
          avatar
        }
      }
    }
  }
`;

export default gameDetailsFragment;
