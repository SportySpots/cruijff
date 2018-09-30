import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, ScrollView } from 'react-native';
import styled from 'styled-components';
import Divider from '../../Divider';
import Block from '../../Block';
import Modal from '../Modal';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const { height: deviceHeight } = Dimensions.get('window');
const MARGIN = 48;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Flex = styled.View`
  display: flex;
`;
//------------------------------------------------------------------------------
const Body = styled.View`
  flex-grow: 1; /* take all remaining height */
`;
//------------------------------------------------------------------------------
const Footer = styled.View`
  padding: 8px;
`;
//------------------------------------------------------------------------------
const StyledScrollView = styled(ScrollView)`
  max-height: ${deviceHeight - (4 * MARGIN)}px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DialogModal = ({
  header,
  children,
  footer,
  ...rest
}) => (
  <Modal {...rest}>
    <Flex>
      {header && (
        <Block>
          {header}
        </Block>
      )}
      <StyledScrollView>
        <Body>
          {children}
        </Body>
      </StyledScrollView>
      {footer && [
        <Divider key="spacer" />,
        <Footer key="footer">
          {footer}
        </Footer>,
      ]}
    </Flex>
  </Modal>
);

DialogModal.propTypes = {
  header: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.object,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  footer: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.object,
  ]),
  // Plus all props from native modal and Modal
};

DialogModal.defaultProps = {
  header: null,
  footer: null,
};

export default DialogModal;
