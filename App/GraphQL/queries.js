import { gql } from 'graphql-tag';

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
        category
      }
      spot {
        uuid
        name
        images {
          image
        }
        amenities {
          sport {
            category
          }
          data
        }
        sports {
          category
        }
        address {
          lat
          lng
        }
      }
      organizer {
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
