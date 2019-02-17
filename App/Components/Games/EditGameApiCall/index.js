import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import SeedorfAPI from '../../../Services/SeedorfApi';

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

    const startTime = moment.utc([
      date.year(),
      date.month(),
      date.date(),
      time.hour(),
      time.minute(),
    ]);
    const endTime = startTime.clone().add(duration, 'minutes');

    try {
      // Set name
      await SeedorfAPI.setGameName({ gameUUID, name });

      // Set date and duration
      const timeRes = await SeedorfAPI.setGameTimes({
        gameUUID,
        startTime: startTime.toISOString(),
        endTime: endTime ? endTime.toISOString() : null,
      });
      console.log('EDIT GAME SET TIME RESPONSE', timeRes);

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
