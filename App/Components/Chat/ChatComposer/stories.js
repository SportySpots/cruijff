import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Block from '../../Common/Block';
import ChatComposer from '.';

class Container extends React.PureComponent {
  state = {
    text: '',
  }

  handleChange = ({ fieldName, value }) => {
    this.setState({ [fieldName]: value });
  }

  render() {
    const { text } = this.state;

    return (
      <Block bgColor="silver" style={{ height: 200 }}>
        <ChatComposer
          text={text}
          placeholder="placeholder"
          onTextChanged={(value) => {
            this.handleChange({ fieldName: 'text', value });
          }}
        />
      </Block>
    );
  }
}

storiesOf('Chat.ChatComposer', module)
  .add('ChatComposer', () => <Container />);
