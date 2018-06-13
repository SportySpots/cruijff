import gql from 'graphql-tag';
import spotDetailsFragment from '../Fragments/spotDetails';

const GET_SPOT_DETAILS = gql`
  query spot($uuid: UUID!) {
    spot(uuid: $uuid) {
      ...spotDetailsFragment
    }
  }
  ${spotDetailsFragment}
`;

export default GET_SPOT_DETAILS;
