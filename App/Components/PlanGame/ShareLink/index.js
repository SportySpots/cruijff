import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import Text from '../../Common/Text';
import Block from '../../Common/Block';

// -----------------------------------------------------------------------------
// STYLE:
// -----------------------------------------------------------------------------
const Flex = styled.View`
  flex: 1; /* full height */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
// -----------------------------------------------------------------------------
const Url = styled(Text.M)`
  color: ${Colors.link};
  text-align: center;
`;
// -----------------------------------------------------------------------------
// COMPONENT:
// -----------------------------------------------------------------------------
const ShareLink = ({ link }) => (
  <Block bgColor={Colors.black54}>
    <Flex>
      <Url>{link}</Url>
    </Flex>
  </Block>
);

ShareLink.propTypes = {
  link: PropTypes.string.isRequired,
};

export default ShareLink;
