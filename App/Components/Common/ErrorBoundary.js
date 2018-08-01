import React from 'react';
import PropTypes from 'prop-types';
import Text from './Text';

// See: https://reactjs.org/docs/error-boundaries.html
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children, fallbackComponent } = this.props;

    if (hasError) {
      return React.createElement(fallbackComponent);
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  fallbackComponent: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

ErrorBoundary.defaultProps = {
  fallbackComponent: () => <Text>Error in Component</Text>,
};

export default ErrorBoundary;
