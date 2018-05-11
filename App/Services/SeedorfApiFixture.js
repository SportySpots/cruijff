import { find, propEq } from 'ramda';

export default {
  getGames: ({ month }) => ({
    ok: true,
    data: require('../Fixtures/games.json'),
  }),
  getAllSpots: () => {
    const spotsData = require('../Fixtures/spots.json');
    const newWestSpots = [289, 288, 287, 286, 512, 300, 311, 291, 292, 294, 295, 298, 75, 77, 74];
    return {
      ok: true,
      data: spotsData.filter(spot => newWestSpots.includes(spot.id)),
    };
  },

  getGame: (id) => {
    const gamesData = require('../Fixtures/games.json');
    const usersData = require('../Fixtures/users.json');
    const sportsData = require('../Fixtures/sports.json');
    const spotsData = require('../Fixtures/spots.json');
    const rsvpStatusData = require('../Fixtures/rsvpStatus.json');
    const game = JSON.parse(JSON.stringify(gamesData.find(game => game.id === id)));
    game.organizer = usersData.find(user => user.id === game.organizer);
    game.sport = sportsData.find(sport => sport.id === game.sport);
    game.spot = spotsData.find(spot => spot.id === game.spot);
    game.rsvpStatuses = rsvpStatusData.filter(rsvp => rsvp.game === game.id).map(status => ({
      ...status,
      user: usersData.find(user => user.id === status.user),
    }));
    return {
      ok: true,
      data: game,
    };
  },

  getSpot: (spotId) => {
    const spotsData = require('../Fixtures/spots.json');
    const spot = find(propEq('id', spotId))(spotsData);
    return {
      ok: true,
      data: spot,
    };
  },
  createGame: game => ({
    ok: true,
    data: { ...game, uuid: 'random-uuid' },
  }),
  submitRating: (spotUuid, userUuid, rating) => ({
    ok: true,
    data: {},
  }),
  signup: () => ({
    ok: true,
    data: {
      token: '12345',
    },
  }),
  verifyToken: token => ({
    ok: true,
  }),
  setToken: token => null,
};
