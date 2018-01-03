import React, { Component } from 'react'
const ReactNativeSvg = jest.genMockFromModule('react-native-svg')

const excludedExports = ['Svg', 'default', '__esModule']
const componentsToMock = Object.keys(ReactNativeSvg).filter(key => {
  return !excludedExports.includes(key)
})

const mocks = generateSvgMocks(componentsToMock)

function generateSvgMocks (names) {
  return names.reduce((acc, name) => {
    acc[name] = generateSvgMock(name)
    return acc
  }, generateSvgMock('Svg'))
}

function generateSvgMock (name) {
  class SvgMock extends Component {
    render () {
      return React.createElement(name, this.props, this.props.children)
    }
  }
  SvgMock.displayName = name
  SvgMock.propTypes = ReactNativeSvg[name].propType
  return SvgMock
}

module.exports = mocks
