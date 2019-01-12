import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import Row from '../../Common/Row';
import Block from '../../Common/Block';
import Spacer from '../../Common/Spacer';
import Text from '../../Common/Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  flex: 1;
  background-color: ${Colors.secondaryGreen};
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
const OnboardingSlide = ({ title, text, image }) => (
  <Container>
    <Spacer size="XXL" />
    <Spacer size="ML" />
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
    <Spacer size="ML" />
    <Title>{title}</Title>
    <Spacer size="XL" />
    <Paragraph>{text}</Paragraph>
  </Container>
);

OnboardingSlide.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.any,
};

OnboardingSlide.defaultProps = {
  title: '',
  text: '',
  image: '',
};

export default OnboardingSlide;


/*
import React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import Spacer from '../../Common/Spacer';
import Text from '../../Common/Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  flex: 1;
  background-color: ${Colors.darkGreen};
`;
//------------------------------------------------------------------------------
const Title = styled(Text.L)`
  flex: 1;
  color: ${Colors.white};
`;
//------------------------------------------------------------------------------
const Paragraph = styled(Text.M)`
  flex: 1;
  color: ${Colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const OnboardingSlide = ({ title, text, image }) => (
  <Container>
    <View>
      <Image
        source={image}
        resizeMode="contain"
        style={{ flex: 1 }}
      />
    </View>
    <View>
      <Title>{title}</Title>
      <Spacer size="XL" />
      <Paragraph>{text}</Paragraph>
    </View>
  </Container>
);

OnboardingSlide.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.any,
};

OnboardingSlide.defaultProps = {
  title: '',
  text: '',
  image: '',
};

export default OnboardingSlide;

*/