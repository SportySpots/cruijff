import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import api from '../../../Services/SeedorfApi';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import EditGameForm from '../EditGameForm';
import { setDate, setStartTime, setEndTime } from '../../../Screens/Plan/PlanGameScreen/utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class EditGame extends React.PureComponent {
  handleSuccess = async (inputFields) => {
    console.log('EDIT_GAME', inputFields);
    const { game, onSuccessHook, onServerErrorHook } = this.props;
    const {
      name,
      date,
      time,
      duration,
      capacity,
      spot,
      description,
      isPublic,
    } = inputFields;

    const gameUUID = game.uuid;

    // Get startTime and endTime from date, time and duration
    const startDate = setDate(date); // beginning of the selected date (moment object)
    const startTime = setStartTime(startDate, time); // moment object
    const endTime = duration ? setEndTime(startTime, duration) : null; // moment object

    console.log('START_DATE', startDate.toISOString()); // '2018-10-06T00:00:00.000Z'
    console.log('START_TIME', startTime.toISOString()); // '2018-10-06T13:15:00.000Z'
    console.log('END_TIME', endTime ? endTime.toISOString() : null); // '2018-10-06T14:15:00.000Z'

    try {
      // Set name
      await api.setGameName({ gameUUID, name });

      // Set date and duration
      await api.setGameTimes({
        gameUUID,
        startTime: startTime.toISOString(),
        endTime: endTime ? endTime.toISOString() : null,
      });

      // Set capacity
      await api.setGameCapacity({ gameUUID, capacity: capacity || null });

      // Set spot
      await api.setGameSpot({ gameUUID, spotUUID: spot.uuid });

      // Set description
      await api.setGameDescription({ gameUUID, description });

      // Set game status
      const res = await api.setGameInviteMode({
        gameUUID,
        inviteMode: isPublic ? 'open' : 'invite_only',
      });

      console.log('UPDATED GAME', res.data);

      // Pass event up to parent component
      onSuccessHook();
    } catch (exc) {
      console.log(exc);
      onServerErrorHook(exc);
    }
  }

  render() {
    const { onServerErrorHook, ...rest } = this.props;

    return (
      <EditGameForm
        {...rest}
        // Overwrite on onSuccessHook
        onSuccessHook={this.handleSuccess}
      />
    );
  }
}

EditGame.propTypes = {
  game: propType(gameDetailsFragment).isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
  onAttendeesPress: PropTypes.func,
};

EditGame.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientErrorHook: () => {},
  onServerErrorHook: () => {},
  onSuccessHook: () => {},
  onAttendeesPress: () => {},
};

export default EditGame;
