import gql from 'graphql-tag';
import spotFragment from '../../Spots/Fragments/spot';

const userDetailsFragment = gql`
  fragment userDetailsFragment on UserType {
    uuid
    first_name
    last_name
    profile {
      uuid
      id
      spots {
        ...spotFragment
      }
    }
    # profile {
    #   year_of_birth
    # }
  }
  ${spotFragment}
`;

export default userDetailsFragment;
