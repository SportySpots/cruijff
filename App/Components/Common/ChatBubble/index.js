import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import Row from '../Row';
import Spacer from '../Spacer';
import Text from '../Text';
import Triangle from '../Triangle';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Bubble = styled.View`
  background-color: ${({ primary }) => (primary ? Colors.notify : Colors.white)};
  padding: 8px 8px 4px 12px;
  border-radius: 8px;
`;
//------------------------------------------------------------------------------
const Title = styled(Text.SM)`
  font-family: Rajdhani-SemiBold;
`;
//------------------------------------------------------------------------------
const Date = styled(Text.SM)`
  color: ${({ primary }) => (primary ? Colors.white : Colors.link)};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ChatBubble = ({
  primary,
  position,
  title,
  text,
  date,
}) => (
  <Row
    justifyContent={position === 'left' ? 'flex-start' : 'flex-end'}
    style={{ flex: 1 }}
  >
    {position === 'left' && (
      <View>
        <Spacer size="XL" />
        <Triangle
          position="top-right"
          primary={primary}
        />
      </View>
    )}
    <Bubble primary={primary}>
      {!!title && (
        <Title>{title}</Title>
      )}
      <Spacer size="XS" />
      <Text.SM>
        {text}
      </Text.SM>
      <Spacer size="XS" />
      <Row justifyContent="flex-end">
        <Date primary={primary}>
          {date}
        </Date>
      </Row>
    </Bubble>
    {position === 'right' && (
      <View>
        <Spacer size="XL" />
        <Triangle
          position="top-left"
          primary={primary}
        />
      </View>
    )}
  </Row>
);

ChatBubble.propTypes = {
  primary: PropTypes.bool,
  position: PropTypes.oneOf(['left', 'right']),
  title: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
};

ChatBubble.defaultProps = {
  primary: false,
  position: 'left',
  title: '',
  text: '',
  date: '',
};

export default ChatBubble;
