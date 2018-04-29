import React from 'react'
import Text from './Text'

// See: https://reactjs.org/docs/error-boundaries.html
class ErrorBoundary extends React.Component {
  state = { hasError: false }

  componentDidCatch () {
    this.setState({ hasError: true })
  }

  render () {
    if (this.state.hasError) {
      return <Text>Error in Component</Text>
    }
    return this.props.children
  }
}

export default ErrorBoundary
