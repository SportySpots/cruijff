import React from 'react';
import PropTypes from 'prop-types';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import Avatar from '../../Common/Avatar';
import ChatBubble from '../ChatBubble';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ChatMsg = ({
  user,
  primary,
  position,
  ...rest
}) => (
  <Row justifyContent={position === 'left' ? 'flex-start' : 'flex-end'}>
    {!primary && <Avatar size="S" user={user} />}
    {!primary && <Spacer row size="S" />}
    <ChatBubble
      primary={primary}
      position={position}
      {...rest}
    />
  </Row>
);

ChatMsg.propTypes = {
  user: PropTypes.object, // eslint-disable-line
  ...ChatBubble.propTypes,
};

export default ChatMsg;
