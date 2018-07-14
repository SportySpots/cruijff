import React from 'react';
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation';
import SportAndTime from './SportAndTime';
import PickSpot from './PickSpot';
import Description from './Description';
import Created from './Created';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const FormScreens = props => (
  React.createElement(new StackNavigator({
    sportTime: {
      screen: () => <SportAndTime {...props} />,
    },
    pickSpot: {
      screen: () => <PickSpot {...props} />,
    },
    description: {
      screen: () => <Description {...props} />,
    },
    created: {
      screen: () => <Created {...props} />,
    },
  }, {
    headerMode: 'none',
    initialRouteName: 'sportTime',
  }))
);

FormScreens.propTypes = {
  onChange: PropTypes.func, // eslint-disable-line
};

FormScreens.defaultProps = {
  onChange: () => {},
};

export default FormScreens;
