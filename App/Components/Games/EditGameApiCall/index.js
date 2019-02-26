import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import SeedorfAPI from '../../../Services/SeedorfApi';
import { handleErrors } from './utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: can we extract the 'if (res && res.problem) {...' logic into a method?
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
      // Set title
      const res = await SeedorfAPI.setGameName({ gameUUID, name });
      handleErrors(res);
    } catch (exc) {
      console.log(exc);
      onEditError(exc);
      return;
    }

    try {
      // Set date and duration
      const res = await SeedorfAPI.setGameTimes({
        gameUUID,
        startTime: startTime.toISOString(),
        endTime: endTime ? endTime.toISOString() : null,
      });
      console.log('EDIT GAME SET TIME RESPONSE', res);
      handleErrors(res);
    } catch (exc) {
      console.log(exc);
      onEditError(exc);
      return;
    }

    try {
      // Set capacity
      const res = await SeedorfAPI.setGameCapacity({ gameUUID, capacity: capacity || null });
      handleErrors(res);
    } catch (exc) {
      console.log(exc);
      onEditError(exc);
      return;
    }

    try {
      // Set spot
      const res = await SeedorfAPI.setGameSpot({ gameUUID, spotUUID: spot.uuid });
      handleErrors(res);
    } catch (exc) {
      console.log(exc);
      onEditError(exc);
      return;
    }

    try {
      // Set description
      const res = await SeedorfAPI.setGameDescription({ gameUUID, description });
      handleErrors(res);
    } catch (exc) {
      console.log(exc);
      onEditError(exc);
      return;
    }

    try {
      // Set game status
      const res = await SeedorfAPI.setGameInviteMode({
        gameUUID,
        inviteMode: isPublic ? 'open' : 'invite_only',
      });
      console.log('UPDATED GAME', res.data);
      handleErrors(res);
    } catch (exc) {
      console.log(exc);
      onEditError(exc);
      return;
    }

    // Pass event up to parent component
    onEditSuccess();
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
