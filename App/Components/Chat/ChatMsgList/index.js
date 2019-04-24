import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, FlatList, View } from 'react-native';
// import styled from 'styled-components/native';
import moment from 'moment';
import Spacer from '../../Common/Spacer';
import ChatMsg from '../ChatMsg';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// const FlexOne = styled.View`
//   flex: 1; /* full height */
// `;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ChatMsgList extends React.PureComponent {
  // componentDidUpdate({ messages: prevMessages }) {
  //   const { messages } = this.props;
  //   console.log('messages.length > prevMessages.length', messages.length > prevMessages.length);

  //   if (this.scroller && messages.length > prevMessages.length) {
  //     this.scroller.scrollToEnd({ animated: true });
  //   }
  // }

  render() {
    const { userId, messages } = this.props;

    return (
      <ScrollView
        ref={(scroller) => { this.scroller = scroller; }}
        onContentSizeChange={() => {
          console.log('ON CONTENT SIZE CHANGE');
          this.scroller.scrollToEnd({ animated: true });
        }}
      >
        <FlatList
          data={messages}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            const isSender = item.senderId === userId;
            const date = moment.utc(item.createdAt).local().format('D-MM HH:mm');

            return (
              <View>
                <ChatMsg
                  title={item.sender.name}
                  text={item.text}
                  date={date}
                  primary={isSender}
                  position={isSender ? 'right' : 'left'}
                  user={{
                    name: item.sender.name,
                    profile: {
                      avatar: item.sender.avatarURL,
                    },
                  }}
                />
                <Spacer size="L" />
              </View>
            );
          }}
        />
      </ScrollView>
    );
  }
}

ChatMsgList.propTypes = {
  userId: PropTypes.string,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string,
      text: PropTypes.string,
      sender: PropTypes.shape({
        name: PropTypes.string,
        avatarURL: PropTypes.string,
      }),
    }),
  ),
};

ChatMsgList.defaultProps = {
  userId: '',
  messages: [],
};

export default ChatMsgList;


// const now = moment.utc().local();
// const yesterday = moment().add(-1, 'day').utc().local();
// let prevDate = messages && messages.length > 0 ? moment.utc(messages[0].createdAt).local() : null;
// console.log('messages', messages);

// return messages.map((msg) => {
//   const isSender = msg.senderId === userId;
//   const date = moment.utc(msg.createdAt).local().format('HH:mm');

//   const diff = prevDate.diff(now, 'hours');

//   if (diff < 0) {
//     errors.time.push('sportDateTimeSlide.fields.time.errors.pastDateTime');
//   } else if (diff <= 900) { // 15 min
//     errors.time.push('sportDateTimeSlide.fields.time.errors.tooSoon');
//   }