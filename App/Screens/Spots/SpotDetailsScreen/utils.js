import moment from 'moment';

/**
 * @summary (This is a hack) filter passed games.
 */
const curatedGames = (games) => {
  const today = moment().startOf('day').toISOString();

  return games && games.length > 0
    ? games.filter(game => game.start_time > today && game.status !== 'DRAFT')
    : [];
};

export default curatedGames;
