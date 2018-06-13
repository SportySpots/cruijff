import gql from 'graphql-tag';

const sportFragment = gql`
  fragment sportFragment on SportType {
    uuid
    id
    name
  }
`;

export default sportFragment;
