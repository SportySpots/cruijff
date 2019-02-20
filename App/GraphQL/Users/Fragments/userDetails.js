import gql from 'graphql-tag';
import spotFragment from '../../Spots/Fragments/spot';

const userDetailsFragment = gql`
  fragment userDetailsFragment on UserType {
    uuid
    name
    profile {
      uuid
      id
      year_of_birth
      avatar
      spots {
        ...spotFragment
      }
      #country
    }
  }
  ${spotFragment}
`;

export default userDetailsFragment;
