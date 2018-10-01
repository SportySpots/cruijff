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
    const { game, onSuccessHook, onServerErrorHook } = this.props;

    try {
      // TODO: pass cancelMsg to api.cancelGame
      const result = await api.setGameStatus({
        gameUUID: game.uuid,
        status: 'Canceled',
      });

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
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
  onAttendeesPress: PropTypes.func,
};

CancelGame.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientErrorHook: () => {},
  onServerErrorHook: () => {},
  onSuccessHook: () => {},
  onAttendeesPress: () => {},
};

export default CancelGame;
