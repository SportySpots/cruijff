import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Text from '../../Common/Text';
import Block from '../../Common/Block';

// TODO: remove if not being used
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
// COMPONENT:
// -----------------------------------------------------------------------------
const ShareLink = ({ link }) => (
  <Block bgColor="black34">
    <Flex>
      <Text size="M" color="link" center>
        {link}
      </Text>
    </Flex>
  </Block>
);

ShareLink.propTypes = {
  link: PropTypes.string.isRequired,
};

export default ShareLink;
