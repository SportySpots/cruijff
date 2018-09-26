import React from 'react';
import PropTypes from 'prop-types';
import Row from '../Row';
import NavDot from '../NavDot';
import range from './utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NavDots = ({ count, activeIndex }) => (
  <Row>
    {range(count).map(i => (
      <NavDot
        key={i}
        active={i === activeIndex}
      />
    ))}
  </Row>
);

NavDots.propTypes = {
  count: PropTypes.number,
  activeIndex: PropTypes.number,
};

NavDots.defaultProps = {
  count: 3,
  activeIndex: 0,
};

export default NavDots;

/*
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const range = function (count) {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(i);
  }
  return result;
};

export const themes = {
  light: StyleSheet.create({
    circle: {
      backgroundColor: '#f00',
    },
    active: {
      backgroundColor: '#0f0',
    },
  }),
};

export default class NavDots extends React.Component {
  static defaultProps = {
    theme: themes.light,
  };
  static propTypes = {
    count: PropTypes.number,
    active: PropTypes.number,
    theme: PropTypes.object,
    style: PropTypes.number,
  };
  render() {
    return (
      <View style={[style.outer, this.props.style]}>
        {range(this.props.count).map(i => (
          <View
            key={i}
            style={[
              style.circle,
              this.props.theme.circle,
              i === this.props.active && [style.active, this.props.theme.active],
            ]}
          />
        ))}
      </View>
    );
  }
}

const style = StyleSheet.create({
  outer: {
    flexDirection: 'row',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  active: {},
});
*/