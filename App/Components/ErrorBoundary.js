import React from 'react'
import Text from './Text'

// See: https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html#introducing-error-boundaries
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
