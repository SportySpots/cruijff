import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: probably need to use absolute-relative position to add white bg.
// backgroundColor prop doesn't work as expected :(
const Checkbox = ({ theme, checked, ...rest }) => {
  const isWhiteTheme = theme === 'white';

  const uncheckedIcon = (
    <Icon
      name="check-box-outline-blank"
      size={48}
      color={isWhiteTheme ? Colors.white : Colors.black}
    />
  );

  const checkedIcon = (
    <Icon
      name="check-box"
      size={48}
      color={Colors.actionYellow}
    />
  );

  return (
    <TouchableOpacity {...rest}>
      {checked ? checkedIcon : uncheckedIcon}
    </TouchableOpacity>
  );
};

Checkbox.propTypes = {
  theme: PropTypes.oneOf(['black', 'white']),
  checked: PropTypes.bool,
  // Plus all props from native TouchableOpacity
};

Checkbox.defaultProps = {
  theme: 'black',
  checked: false,
};

export default Checkbox;

/*
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const ButtonContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Checkbox = props => (
  <TouchableOpacity {...props}>
    <ButtonContainer>
      <Icon
        name="check-box-outline-blank"
        size={48}
        color={Colors.white}
      />
    </ButtonContainer>
  </TouchableOpacity>
);

Checkbox.propTypes = {

}

export default Checkbox;
*/
