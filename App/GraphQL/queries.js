import gql from 'graphql-tag';

export const GET_GAME_DETAILS = gql`
  query game($uuid: UUID!) {
    game(uuid: $uuid) {
      uuid
      name
      start_time
      end_time
      is_featured
      show_remaining
      capacity
      description
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
  }
`;
