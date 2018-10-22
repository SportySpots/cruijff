import React from 'react';
import PropTypes from 'prop-types';
import SeedorfAPI from '../../../Services/SeedorfApi';
import { getUserTZ, setDate, setStartTime, setEndTime } from './utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class PlanGameApiCall extends React.PureComponent {
  handleCreate = async (inputFields) => {
    const { onPlanSuccess, onPlanError } = this.props;
    const {
      name,
      sport,
      date,
      time,
      duration,
      capacity,
      spot,
      description,
    } = inputFields;


    // Get user timezone, startTime and endTime from date, time and duration
    const userTZ = getUserTZ();
    const startDate = setDate(date); // beginning of the selected date (moment object)
    const startTime = setStartTime(startDate, time); // moment object
    const endTime = duration ? setEndTime(startTime, duration) : null; // moment object

    console.log('USER_TZ', userTZ);
    console.log('DATE', date);
    console.log('TIME', time);
    console.log('START_DATE', startDate.toISOString()); // '2018-10-06T00:00:00.000Z'
    console.log('START_TIME', startTime.toISOString()); // '2018-10-06T13:15:00.000Z'
    console.log('END_TIME', endTime ? endTime.toISOString() : null); // '2018-10-06T14:15:00.000Z'

    // TODO: replace this with a single endpoint
    try {
      // Create game
      const result = await SeedorfAPI.createGame({
        name,
        startTZ: userTZ,
        startTime: startTime.toISOString(),
        endTZ: userTZ,
        endTime: endTime ? endTime.toISOString() : null,
        capacity,
        description,
      });
      const gameUUID = result.data.uuid;

      // Set sport
      await SeedorfAPI.setGameSport({ gameUUID, sport });

      // Set spot
      await SeedorfAPI.setGameSpot({ gameUUID, spotUUID: spot.uuid });

      // Set game status to 'planned'
      const res = await SeedorfAPI.setGameStatus({ gameUUID, status: 'PLANNED' });
      console.log('CREATED GAME', res.data);


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
