import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Block from '../../Common/Block';
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
      <Block>
        <ChatInputField
          value={msg}
          onChangeText={(value) => {
            this.handleChange({ fieldName: 'msg', value });
          }}
        />
      </Block>
    );
  }
}

storiesOf('Chat.ChatInputField', module)
  .add('ChatInputField', () => <Container />);
