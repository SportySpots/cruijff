import React, { Component } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import Text from '../Text'
import Colors from '../../Themes/Colors'

const SpotProperties = ({ properties, lineColor }) => (
  <PropertyContainer>
    {Object.keys(properties).map(key => (
      <PropertyRow lineColor={lineColor} key={key}>
        <PropertyLabel>{key}</PropertyLabel>
        <PropertyValue>{properties[key]}</PropertyValue>
      </PropertyRow>
    ))}
  </PropertyContainer>
)

export default SpotProperties

const PropertyContainer = styled.View`
  display: flex;
  flex-direction: column;
`

const PropertyRow = styled.View`
display: flex;
padding: 8px;
flex-direction: row;
height: 40px;
border-bottom-color: ${props => props.lineColor || Colors.lightGray}
border-bottom-width: 1px;
`
const PropertyLabel = styled(Text.M)`
  flex: 1;
  font-weight: 400;
  color: ${props => props.textColor || '#000'};
  padding-horizontal: 20px;
`
const PropertyValue = styled(Text.M)`
  flex: 1;
  font-weight: 500;
  color: ${props => props.textColor || '#000'};
`
