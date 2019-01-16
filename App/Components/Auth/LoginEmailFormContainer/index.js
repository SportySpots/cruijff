import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import Text from '../../Common/Text';

// TODO: cleanup, try making it simpler, better var names!
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Relative = styled.View`
  position: relative;
  margin: 0;
`;
//------------------------------------------------------------------------------
const Flap = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;
//------------------------------------------------------------------------------
const Head = styled(Block)`
  background-color: ${Colors.white};
  border: 1px solid ${Colors.lightGray};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
//------------------------------------------------------------------------------
const Body = styled.View`
  flex: 1;
  position: absolute;
  top: 30;
  left: 0;
  right: 0;
  background-color: ${Colors.white};
  border-top-width: 1px;
  border-top-color: ${Colors.lightGray};
  height: 500px;
`;
//------------------------------------------------------------------------------
const TitleContainer = styled.View`
  background-color: ${Colors.white};
`;
//------------------------------------------------------------------------------
const Title = styled.View`
  position: absolute;
  top: 20;
  left: 0;
  right: 0;
  text-align: center;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LoginEmailFormContainer = ({ children, title, width }) => (
  <Relative>
    <Flap>
      <Row
        justifyContent="center"
        alignItems="center"
      >
        <Head midHeight style={{ height: 50, width }} />
      </Row>
    </Flap>

    <Body>
      <Spacer size="XL" />
      {children}
    </Body>

    <Title>
      <Row
        justifyContent="center"
        alignItems="center"
      >
        <TitleContainer style={{ width: width - 3 }}>
          <Text.M style={{ textAlign: 'center' }}>
            {title}
          </Text.M>
        </TitleContainer>
      </Row>
    </Title>
  </Relative>
);

LoginEmailFormContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  title: PropTypes.string,
  width: PropTypes.number,
};

LoginEmailFormContainer.defaultProps = {
  title: '',
  width: 200,
};

export default LoginEmailFormContainer;
