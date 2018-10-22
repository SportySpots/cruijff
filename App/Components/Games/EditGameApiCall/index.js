import React from 'react';
import PropTypes from 'prop-types';
import SeedorfAPI from '../../../Services/SeedorfApi';
import { setDate, setStartTime, setEndTime } from '../../../Screens/Plan/PlanGameScreen/utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class EditGameApiCall extends React.PureComponent {
  handleUpdate = async (inputFields) => {
    const { onEditSuccess, onEditError } = this.props;
    const {
      gameUUID,
      name,
      date,
      time,
      duration,
      capacity,
      spot,
      description,
      isPublic,
    } = inputFields;

    // Get startTime and endTime from date, time and duration
    const startDate = setDate(date); // beginning of the selected date (moment object)
    const startTime = setStartTime(startDate, time); // moment object
    const endTime = duration ? setEndTime(startTime, duration) : null; // moment object

    console.log('START_DATE', startDate.toISOString()); // '2018-10-06T00:00:00.000Z'
    console.log('START_TIME', startTime.toISOString()); // '2018-10-06T13:15:00.000Z'
    console.log('END_TIME', endTime ? endTime.toISOString() : null); // '2018-10-06T14:15:00.000Z'

    try {
      // Set name
      await SeedorfAPI.setGameName({ gameUUID, name });

      // Set date and duration
      await SeedorfAPI.setGameTimes({
        gameUUID,
        startTime: startTime.toISOString(),
        endTime: endTime ? endTime.toISOString() : null,
      });

      // Set capacity
      await SeedorfAPI.setGameCapacity({ gameUUID, capacity: capacity || null });

      // Set spot
      await SeedorfAPI.setGameSpot({ gameUUID, spotUUID: spot.uuid });

      // Set description
      await SeedorfAPI.setGameDescription({ gameUUID, description });

      // Set game status
      const res = await SeedorfAPI.setGameInviteMode({
        gameUUID,
        inviteMode: isPublic ? 'open' : 'invite_only',
      });

      console.log('UPDATED GAME', res.data);

      // Pass event up to parent component
      onEditSuccess();
    } catch (exc) {
      console.log(exc);
      onEditError(exc);
    }
  }

  render() {
    const { children } = this.props;

    // Public API
    const api = {
      updateGame: this.handleUpdate,
    };

    return children(api);
  }
}

EditGameApiCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  onEditError: PropTypes.func,
  onEditSuccess: PropTypes.func,
};

EditGameApiCall.defaultProps = {
  onEditError: () => {},
  onEditSuccess: () => {},
};

export default EditGameApiCall;
