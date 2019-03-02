// import React from 'react';
// import PropTypes from 'prop-types';
// import moment from 'moment';
// import styled from 'styled-components';
// import Colors from '../../../Themes/Colors';
// import { locationPropTypes, withLocation } from '../../../Context/Location';
// import { QueryCatchErrors } from '../../../GraphQL/QueryCatchErrors';
// import GET_GAMES_LIST from '../../../GraphQL/Games/Queries/GET_GAMES_LIST';
// import GamesList from '../../../Components/Games/GamesList';

// //------------------------------------------------------------------------------
// // STYLE:
// //------------------------------------------------------------------------------
// const Container = styled.View`
//   flex: 1;
//   padding: 0 8px;
//   background-color: ${Colors.concrete};
// `;
// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// class NotificationsListScreen extends React.Component {
//   handleNotificationsPress = (notification) => {
//     const { navigation } = this.props;
//     // navigation.navigate('TODO', { uuid: game.uuid });
//   }

//   render() {
//     const { user } = this.props;

//     return (
//       <QueryCatchErrors
//         // query={GET_GAMES_LIST}
//         // variables={variables}
//         fetchPolicy="cache-and-network"
//       >
//         {({
//           loading,
//           data,
//           refetch,
//           fetchMore,
//         }) => {
//           const loadMore = () => {
//             fetchMore({
//               variables: {
//                 offset: (data && data.games && data.games.length) || 0,
//               },
//               updateQuery: (prev, { fetchMoreResult }) => {
//                 if (!fetchMoreResult) return prev;
//                 return Object.assign({}, prev, {
//                   games: [...prev.games, ...fetchMoreResult.games],
//                 });
//               },
//             });
//           };

//           return (
//             <Container testID="GameListScreen">
//               <GamesList
//                 games={(data && data.games && curatedGames(data.games)) || []}
//                 onCardPress={this.handleGamePress}
//                 // FlatList props
//                 onRefresh={refetch}
//                 refreshing={loading}
//                 onEndReached={loadMore}
//                 onEndReachedThreshold={0.1}
//               />
//             </Container>
//           );
//         }}
//       </QueryCatchErrors>
//     );
//   }
// }

// NotificationsListScreen.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired,
//   }).isRequired,
//   location: locationPropTypes.location.isRequired,
// };

// export default withLocation(NotificationsListScreen);
