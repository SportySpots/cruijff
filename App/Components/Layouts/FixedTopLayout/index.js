import styled from 'styled-components';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
export const TopLayout = styled.View`
  display: flex;
  justify-content: center;
  height: 46px;
  background-color: ${Colors.white}
  border-bottom-width: 0.5px;
  border-color: ${Colors.lightGray}
  padding-horizontal: 16px;
`;
//------------------------------------------------------------------------------
export const BottomLayout = styled.ScrollView`
  flex: 1;
  background-color: ${Colors.concrete};
`;

/* import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const StyledTopLayout = styled.View`
  display: flex;
  justify-content: center;
  height: 46px;
  background-color: ${Colors.white}
  border-bottom-width: 0.5px;
  border-color: ${Colors.lightGray}
  padding-horizontal: 16px;
`;
//------------------------------------------------------------------------------
export const BottomLayout = styled.ScrollView`
  flex: 1;
  background-color: ${Colors.concrete};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
export class TopLayout extends React.PureComponent {
  state = {
    fadeAnim: new Animated.Value(0), // Initial value for opacity: 1
  }

  componentDidMount() {
    const { fadeAnim } = this.state;

    Animated.timing( // Animate over time
      fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 1000, // Make it take a while
      },
    ).start(); // Starts the animation
  }

  componentWillUnmount() {
    const { fadeAnim } = this.state;

    Animated.timing( // Animate over time
      fadeAnim, // The animated value to drive
      {
        toValue: 0, // Animate to opacity: 1 (opaque)
        duration: 1000, // Make it take a while
      },
    ).start(); // Starts the animation
  }

  render() {
    const { children } = this.props;
    const { fadeAnim } = this.state;

    return (
      <Animated.View style={{ opacity: fadeAnim }}>
        <StyledTopLayout>
          {children}
        </StyledTopLayout>
      </Animated.View>
    );
  }
}

TopLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
};

*/