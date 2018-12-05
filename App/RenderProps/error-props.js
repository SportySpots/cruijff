import React from 'react';
import PropTypes from 'prop-types';
import isObjectLike from 'lodash/isObjectLike';

//------------------------------------------------------------------------------
// PROPS AND METHODS PROVIDER:
//------------------------------------------------------------------------------
class ErrorProps extends React.PureComponent {
  state = {
    errors: null,
  }

  setErrors = (errors) => {
    if (errors && isObjectLike(errors)) {
      this.setState(() => ({ errors }));
    } else {
      console.log('ERRORS IS NOT AN OBJECT', errors);
    }
  }

  clearErrors = () => {
    this.setState(() => ({ errors: null }));
  }

  render() {
    const { children } = this.props;
    const { errors } = this.state;

    // Public API
    const api = {
      errors,
      setErrors: this.setErrors,
      clearErrors: this.clearErrors,
    };

    return children(api);
  }
}

ErrorProps.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

export default ErrorProps;

//------------------------------------------------------------------------------
// PROP TYPES:
//------------------------------------------------------------------------------
export const errorPropTypes = {
  errors: PropTypes.object,
  setErrors: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};
