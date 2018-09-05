import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import api from '../../../Services/SeedorfApi';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import CancelGameForm from '../CancelGameForm';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class CancelGame extends React.PureComponent {
  handleSuccess = async ({ cancelMsg }) => {
    console.log('CANCEL_MSG', cancelMsg);
    const { game, onSuccessHook, onServerErrorHook } = this.props;

    try {
      // TODO: pass cancelMsg to api.cancelGame
      const result = await api.setGameStatus({
        gameUUID: game.uuid,
        status: 'Canceled',
      });

      console.log('RESULT', result);

      if (result.ok) {
        // Pass event up to parent component
        onSuccessHook();
      } else {
        onServerErrorHook({ message: 'Error on setGameStatus' });
      }
    } catch (exc) {
      console.log(exc);
      onServerErrorHook(exc);
    }
  }

  render() {
    const { onServerErrorHook, ...rest } = this.props;

    return (
      <CancelGameForm
        {...rest}
        // Overwrite on onSuccessHook
        onSuccessHook={this.handleSuccess}
      />
    );
  }
}

CancelGame.propTypes = {
  game: propType(gameDetailsFragment).isRequired,
  disabled: PropTypes.bool.isRequired,
  onBeforeHook: PropTypes.func.isRequired,
  onClientErrorHook: PropTypes.func.isRequired,
  onServerErrorHook: PropTypes.func.isRequired,
  onSuccessHook: PropTypes.func.isRequired,
  onAttendeesPress: PropTypes.func.isRequired,
};

export default CancelGame;
