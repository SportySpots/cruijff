import gql from 'graphql-tag';

const spotMapFragment = gql`
  fragment spotMapFragment on SpotType {
    uuid
    name
    address {
      uuid
      lat
      lng
    }
  }
`;

export default spotMapFragment;
