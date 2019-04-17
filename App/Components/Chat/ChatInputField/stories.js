import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import ChatInputField from '.';

class Container extends React.PureComponent {
  state = {
    msg: '',
  }

  handleChange = ({ fieldName, value }) => {
    this.setState({ [fieldName]: value });
  }

  render() {
    const { msg } = this.state;

    return (
      <View>
        <ChatInputField
          value={msg}
          onChangeText={(value) => {
            this.handleChange({ fieldName: 'msg', value });
          }}
        />
      </View>
    );
  }
}

storiesOf('Chat.ChatInputField', module)
  .add('ChatInputField', () => <Container />);
