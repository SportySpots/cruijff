import React from 'react';
import PropTypes from 'prop-types';
import SeedorfAPI from '../../../Services/SeedorfApi';
import curateErrors from './utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class CancelGameApiCall extends React.PureComponent {
  handleCancel = async (inputFields) => {
    const { onCancelSuccess, onCancelError } = this.props;
    const { gameUUID, cancelMsg } = inputFields;

    try {
      // TODO: pass cancelMsg to api.cancelGame
      const res = await SeedorfAPI.setGameStatus({ gameUUID, status: 'CANCELED' });

      console.log('CANCEL_GAME', res);

      // Pass event up to parent component
      if (res && res.problem) {
        const errors = curateErrors(res.data);
        onCancelError(errors);
        return;
      }
    } catch (exc) {
      console.log(exc);
      onCancelError(exc);
      return;
    }

    // Pass event up to parent component
    onCancelSuccess({ gameUUID });
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
