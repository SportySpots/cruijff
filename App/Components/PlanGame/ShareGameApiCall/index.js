import React from 'react';
import PropTypes from 'prop-types';
import SeedorfAPI from '../../../Services/SeedorfApi';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ShareGameApiCall extends React.PureComponent {
  handleShare = async (inputFields) => {
    const { onShareSuccess, onShareError } = this.props;
    const { gameUUID, isPublic } = inputFields;

    try {
      // Set game invite mode
      await SeedorfAPI.setGameInviteMode({
        gameUUID,
        inviteMode: isPublic ? 'open' : 'invite_only',
      });

      // Pass event up to parent component
      onShareSuccess({ gameUUID });
    } catch (exc) {
      console.log(exc);
      onShareError(exc);
    }
  }

  render() {
    const { children } = this.props;

    // Public API
    const api = {
      shareGame: this.handleShare,
    };

    return children(api);
  }
}

ShareGameApiCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  onShareError: PropTypes.func,
  onShareSuccess: PropTypes.func,
};

ShareGameApiCall.defaultProps = {
  onShareError: () => {},
  onShareSuccess: () => {},
};

export default ShareGameApiCall;
