import gql from 'graphql-tag';

const gamePlanFragment = gql`
  fragment gamePlanFragment on GameType {
    uuid
    start_time
    end_time
    capacity
    sport {
      uuid
      id
      name
      category
    }
    spot {
      uuid
      name
    }
  }
`;

export default gamePlanFragment;
