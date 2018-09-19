import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import Divider from '../../Divider';
import Block from '../../Block';
import Modal from '../Modal';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Flex = styled.View`
  display: flex;
`;
//------------------------------------------------------------------------------
const Body = styled.View`
  flex-grow: 1; /* full height */
`;
//------------------------------------------------------------------------------
const Footer = styled.View`
  padding: 8px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DialogModal = ({
  withHeader,
  header,
  children,
  footer,
  ...rest
}) => (
  <Modal {...rest}>
    <Flex>
      {withHeader && (
        <Block>
          {header}
        </Block>
      )}
      <ScrollView>
        <Body>
          {children}
        </Body>
      </ScrollView>
      <Divider />
      <Footer>
        {footer}
      </Footer>
    </Flex>
  </Modal>
);

DialogModal.propTypes = {
  withHeader: PropTypes.bool,
  header: PropTypes.oneOfType(
    PropTypes.node,
    PropTypes.func,
    PropTypes.object,
  ),
  children: PropTypes.node.isRequired,
  footer: PropTypes.oneOfType(
    PropTypes.node,
    PropTypes.func,
    PropTypes.object,
  ),
  // Plus all props from native modal and Modal
};

DialogModal.defaultProps = {
  withHeader: true,
  header: () => null,
  footer: () => null,
};

export default DialogModal;
