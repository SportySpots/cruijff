import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { StackNavigator } from 'react-navigation';
import userDetailsFragment from '../../GraphQL/Users/Fragments/userDetails';
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
  user: propType(userDetailsFragment).isRequired, // eslint-disable-line
  onChange: PropTypes.func, // eslint-disable-line
};

FormScreens.defaultProps = {
  onChange: () => {},
};

export default FormScreens;
