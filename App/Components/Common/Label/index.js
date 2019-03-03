import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import Text from '../Text';

// TODO: do we need this component?
const Label = styled(Text.M)`
  color: ${({ whiteColor }) => (whiteColor ? Colors.white : Colors.dusk)};
  margin-bottom: 16px;
  font-size: 17px;
`;

Label.propTypes = {
  whiteColor: PropTypes.bool,
};

Label.defaultProps = {
  whiteColor: false,
};

export default Label;
