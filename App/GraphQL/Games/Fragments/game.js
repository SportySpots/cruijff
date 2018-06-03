import gql from 'graphql-tag';

const gameFragment = gql`
  fragment gameFragment on GameType {
    uuid
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
    spot {
      uuid
      name
      images {
        uuid
        image
      }
      amenities {
        uuid
        sport {
          uuid
          category
        }
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
      #user {
      #  uuid
      #  name
      #}
    }
  }
`;

export default gameFragment;
