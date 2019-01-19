import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import styled from 'styled-components';
import Colors from '../../Themes/Colors';
import Row from '../../Components/Common/Row';
import Block from '../../Components/Common/Block';
import Spacer from '../../Components/Common/Spacer';
import Text from '../../Components/Common/Text';

// TODO: move to background folder
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  flex: 1;
  background-color: ${Colors.secondaryGreen};
`;
//------------------------------------------------------------------------------
const TextContainer = styled.View`
  width: 100%;
  max-width: 280px;
  margin: 0 auto;
`;
//------------------------------------------------------------------------------
const Title = styled(Text.L)`
  color: ${Colors.white};
  text-align: center;
`;
//------------------------------------------------------------------------------
const Paragraph = styled(Text.M)`
  color: ${Colors.white};
  text-align: center;
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
        <Title>{title}</Title>
        <Spacer size="XL" />
        <Paragraph>{text}</Paragraph>
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
