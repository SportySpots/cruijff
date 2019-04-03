import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import Row from '../../Components/Common/Row';
import Block from '../../Components/Common/Block';
import Spacer from '../../Components/Common/Spacer';
import Text from '../../Components/Common/Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondaryGreen};
`;
//------------------------------------------------------------------------------
const TextContainer = styled.View`
  width: 100%;
  max-width: 280px;
  margin: 0 auto;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ImageBackground = ({
  image,
  title,
  text,
  children,
}) => (
  <Container>
    <Spacer size="XXL" />
    {!!image && (
      <Block>
        <Row alignItems="center">
          <Image
            source={image}
            resizeMode="contain"
            style={{ flex: 1 }}
          />
        </Row>
      </Block>
    )}
    <Spacer size="XXXL" />
    {!!title && !!text && (
      <TextContainer>
        <Text size="L" color="white" center>
          {title}
        </Text>
        <Spacer size="XL" />
        <Text size="M" color="white" center>
          {text}
        </Text>
      </TextContainer>
    )}
    {children}
  </Container>
);

ImageBackground.propTypes = {
  image: PropTypes.any, // eslint-disable-line
  title: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]),
};

ImageBackground.defaultProps = {
  image: null,
  title: '',
  text: '',
  children: null,
};

export default ImageBackground;
