import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import SeedorfAPI from '../../../Services/SeedorfApi';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class PlanGameApiCall extends React.PureComponent {
  handleCreate = async (inputFields) => {
    const { onPlanSuccess, onPlanError } = this.props;
    const {
      title,
      sport,
      date,
      time,
      duration,
      capacity,
      spot,
      description,
    } = inputFields;

    // Get user timezone, startTime and endTime from date, time and duration
    const userTZ = moment.tz.guess();
    const startTime = moment.utc([
      date.year(),
      date.month(),
      date.date(),
      time.hour(),
      time.minute(),
    ]);
    const endTime = startTime.clone().add(duration, 'minutes');

    // TODO: replace this with a single endpoint
    try {
      // Create game
      const gameResponse = await SeedorfAPI.createGame({
        title,
        startTZ: userTZ,
        startTime: startTime.toISOString(),
        endTZ: userTZ,
        endTime: endTime ? endTime.toISOString() : null,
        capacity,
        description,
      });
      const gameUUID = gameResponse.data.uuid;
      console.log('GAME_RESPONSE', gameResponse);

      // Set sport
      const sportResponse = await SeedorfAPI.setGameSport({ gameUUID, sport });
      console.log('SPORT_RESPONSE', sportResponse);

      // Set spot
      const spotResponse = await SeedorfAPI.setGameSpot({ gameUUID, spotUUID: spot.uuid });
      console.log('SPOT_RESPONSE', spotResponse);

      // Set game status to 'planned'
      const statusResponse = await SeedorfAPI.setGameStatus({ gameUUID, status: 'PLANNED' });
      console.log('CREATED GAME', statusResponse);


      // Pass event up to parent component
      onPlanSuccess({ gameUUID });
    } catch (exc) {
      console.log(exc);
      onPlanError(exc);
    }
  }

  render() {
    const { children } = this.props;

    // Public API
    const api = {
      createGame: this.handleCreate,
    };

    return children(api);
  }
}

PlanGameApiCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  onPlanError: PropTypes.func,
  onPlanSuccess: PropTypes.func,
};

PlanGameApiCall.defaultProps = {
  onPlanError: () => {},
  onPlanSuccess: () => {},
};

export default PlanGameApiCall;
