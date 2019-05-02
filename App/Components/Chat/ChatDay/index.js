import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import Divider from '../../Common/Divider';
import Text from '../../Common/Text';
import isSameDay from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const StyledDivider = styled(Divider)`
  flex-grow: 1;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ChatDay = ({
  currentMessage,
  previousMessage,
  nextMessage,
  inverted,
  locale,
}) => {
  if (!isSameDay(currentMessage, inverted ? previousMessage : nextMessage)) {
    return (
      <Block>
        <Row alignItems="center">
          <StyledDivider />
          <Spacer row size="L" />
          <Text color="shade">
            {moment(currentMessage.createdAt)
              .locale(locale)
              .format('dddd')
              .toTitleCase()}
          </Text>
          <Spacer row size="L" />
          <StyledDivider />
        </Row>
      </Block>
    );
  }
  return null;
};

ChatDay.propTypes = {
  currentMessage: PropTypes.object, // eslint-disable-line
  previousMessage: PropTypes.object, // eslint-disable-line
  nextMessage: PropTypes.object, // eslint-disable-line
  inverted: PropTypes.bool, // eslint-disable-line
  locale: PropTypes.string,
};

ChatDay.defaultProps = {
  currentMessage: {
    // TODO: test if crash when createdAt === null
    createdAt: null,
  },
  previousMessage: {},
  nextMessage: {},
  locale: 'en',
};

export default ChatDay;
