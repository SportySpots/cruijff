import gql from 'graphql-tag';
import gamePlanFragment from '../Fragments/gamePlan';

const GET_GAME_PLAN = gql`
  query game($uuid: UUID!) {
    game(uuid: $uuid) {
      ...gamePlanFragment
    }
  }
  ${gamePlanFragment}
`;

export default GET_GAME_PLAN;
