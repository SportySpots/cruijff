import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import Row from '../../Common/Row';
import Block from '../../Common/Block';
import Spacer from '../../Common/Spacer';
import Text from '../../Common/Text';

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
const ImageSlide = ({ title, text, image }) => (
  <Container>
    <Spacer size="XXL" />
    <Block>
      <Row alignItems="center">
        <Image
          source={image}
          resizeMode="contain"
          style={{ flex: 1 }}
        />
      </Row>
    </Block>
    <Spacer size="XXXL" />
    <TextContainer>
      <Title>{title}</Title>
      <Spacer size="XL" />
      <Paragraph>{text}</Paragraph>
    </TextContainer>
  </Container>
);

ImageSlide.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.any, // eslint-disable-line
};

ImageSlide.defaultProps = {
  title: '',
  text: '',
  image: '',
};

export default ImageSlide;
