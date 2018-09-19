import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import Divider from '../../Divider';
import Spacer from '../../Spacer';
import Modal from '../Modal';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Flex = styled.View`
  display: flex;
`;
//------------------------------------------------------------------------------
const Header = styled.View`
  padding: 8px;
`;
//------------------------------------------------------------------------------
const Body = styled.View`
  flex-grow: 1; /* full height */
  padding: 32px 16px;
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
        <Header>
          {header}
        </Header>
      )}
      {withHeader && (
        <Spacer orientation="column" size="L" />
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


/*
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Divider from '../../../../Components/Common/Divider';
import Modal from '../Modal';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Body = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 16px;
  border: 1px solid orange;
`;
//------------------------------------------------------------------------------
const Footer = styled.View`
  padding: 8px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DialogModal = ({ children, footer, ...rest }) => (
  <Modal {...rest}>
    <Body>
      {children}
    </Body>
    <Divider />
    <Footer>
      {footer}
    </Footer>
  </Modal>
);

DialogModal.propTypes = {
  children: PropTypes.node.isRequired,
  footer: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  // Plus all props from native modal and Modal
};

DialogModal.defaultProps = {
  footer: () => null,
};

export default DialogModal;

*/