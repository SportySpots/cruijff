import React from 'react';
import PropTypes from 'prop-types';
import SeedorfAPI from '../../../Services/SeedorfApi';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class CancelGameApiCall extends React.PureComponent {
  handleCancel = async (inputFields) => {
    const { onCancelSuccess, onCancelError } = this.props;
    const { gameUUID, cancelMsg } = inputFields;

    try {
      // TODO: pass cancelMsg to api.cancelGame
      const result = await SeedorfAPI.setGameStatus({
        gameUUID,
        status: 'CANCELED',
      });

      console.log('CANCEL_GAME', result);

      if (result.ok) {
        // Pass event up to parent component
        onCancelSuccess({ gameUUID });
      } else {
        onCancelError({ message: 'Error on setGameStatus' });
      }
    } catch (exc) {
      console.log(exc);
      onCancelError(exc);
    }
  }

  render() {
    const { children } = this.props;

    // Public API
    const api = {
      cancelGame: this.handleCancel,
    };

    return children(api);
  }
}

CancelGameApiCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  onCancelError: PropTypes.func,
  onCancelSuccess: PropTypes.func,
};

CancelGameApiCall.defaultProps = {
  onCancelError: () => {},
  onCancelSuccess: () => {},
};

export default CancelGameApiCall;

