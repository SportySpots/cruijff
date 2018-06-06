import gql from 'graphql-tag';

const sportFragment = gql`
  fragment sportFragment on SportType {
    uuid
    name
  }
`;

export default sportFragment;
