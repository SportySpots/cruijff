import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import Text from '../Text';

// TODO: do we need this component?
const Label = styled(Text.M)`
  color: ${({ whiteColor }) => (whiteColor ? Colors.white : Colors.black)};
  margin-bottom: 16px;
`;

Label.propTypes = {
  whiteColor: PropTypes.bool,
};

Label.defaultProps = {
  whiteColor: false,
};

export default Label;
