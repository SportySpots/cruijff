import gql from 'graphql-tag';
import spotDetailsFragment from '../Fragments/spotDetails';

const spot = gql`
  query spot($uuid: UUID) {
    spot(uuid: $uuid) {
      ...spotDetailsFragment
    }
  }
  ${spotDetailsFragment}
`;

export default spot;
