import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import Text from './Text'
import Colors from '../Themes/Colors'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class RatingBig extends React.Component {
  static propTypes = {
    rating: PropTypes.number
  }
  render () {
    return (
      <RatingContainer>
        {[1, 2, 3, 4, 5].map(i => {
          const IconComp = i <= this.props.rating ? FullStar : Star
          return <IconComp key={i} name='stars' size={24} />
        })}
      </RatingContainer>
    )
  }
}

const RatingContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Star = styled(Icon)`
  color: ${Colors.black54};
  padding-right: 10px;
`

const FullStar = Star.extend`
  color: ${Colors.primaryGreen};
`
