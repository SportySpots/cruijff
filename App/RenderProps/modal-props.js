import React from 'react';
import PropTypes from 'prop-types';

//------------------------------------------------------------------------------
// PROPS AND METHODS PROVIDER:
//------------------------------------------------------------------------------
class ModalProps extends React.PureComponent {
  state = {
    visible: false,
  };

  openModal = (cb) => {
    this.setState(() => ({ visible: true }));
    // Allow other components to extend openModal default functionality
    if (cb && typeof cb === 'function') { cb(); }
  };

  closeModal = (cb) => {
    this.setState(() => ({ visible: false }));
    // Allow other components to extend closeModal default functionality
    if (cb && typeof cb === 'function') { cb(); }
  };

  render() {
    const { children } = this.props;
    const { visible } = this.state;

    // Public API
    const api = {
      visible,
      openModal: this.openModal,
      closeModal: this.closeModal,
    };

    return children(api);
  }
}

ModalProps.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

export default ModalProps;

//------------------------------------------------------------------------------
// PROP TYPES:
//------------------------------------------------------------------------------
export const modalPropTypes = {
  visible: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
