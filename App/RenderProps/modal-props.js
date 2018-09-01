import React from 'react';
import PropTypes from 'prop-types';

//------------------------------------------------------------------------------
// PROPS AND METHODS PROVIDER:
//------------------------------------------------------------------------------
class ModalProps extends React.PureComponent {
  state = {
    visible: false,
  };

  open = () => {
    this.setState(() => ({ visible: true }));
  };

  close = () => {
    this.setState(() => ({ visible: false }));
  };

  render() {
    const { children } = this.props;
    const { visible } = this.state;

    // Public API
    const api = {
      visible,
      open: this.open,
      close: this.close,
    };

    return children(api);
  }
}

ModalProps.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default ModalProps;

//------------------------------------------------------------------------------
// PROP TYPES:
//------------------------------------------------------------------------------
export const modalPropTypes = {
  visible: PropTypes.bool.isRequired,
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};
