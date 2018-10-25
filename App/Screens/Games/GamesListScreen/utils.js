import { uniqBy } from 'ramda';

/**
 * @summary (This is a hack) some of the games have no spot associated to them.
 * This is caused when the user visits the create game screen (an empty game is
 * created by default) and leaves without finishing the process.
 */
const curatedGames = games => (
  games && games.length > 0
    ? uniqBy(({ uuid }) => (uuid), games.filter(game => game.status !== 'DRAFT' && game.spot))
    : []
);

export default curatedGames;
