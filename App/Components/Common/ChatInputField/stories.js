// import { storiesOf } from '@storybook/react-native';
// import React from 'react';
// import Colors from '../../../Themes/Colors';
// import Block from '../Block';
// import ChatInputField from '.';

// const data = [
//   {
//     label: 'Banana', value: 'banana',
//   },
//   {
//     label: 'Mango', value: 'mango',
//   },
//   {
//     label: 'Pear', value: 'pear',
//   },
// ];

// storiesOf('Common.ChatInputField', module)
//   .add('ChatInputField TextField comp', () => (
//     <ChatInputField
//       comp="TextField"
//       label="I'm the label"
//       value="I'm the value"
//       prefix="prefix"
//       suffix="suffix"
//     />
//   ))
//   .add('ChatInputField TextField comp with ERROR', () => (
//     <ChatInputField
//       comp="TextField"
//       label="I'm the label"
//       value="I'm the value"
//       error="I'm the error"
//     />
//   ))
//   .add('ChatInputField TextField comp DISABLED', () => (
//     <ChatInputField
//       comp="TextField"
//       label="I'm the label"
//       value="I'm the value"
//       disabled
//     />
//   ))
//   .add('ChatInputField TextField comp fullWidth', () => (
//     <ChatInputField
//       comp="TextField"
//       label="I'm the label"
//       value="I'm the value"
//       fullWidth
//     />
//   ))
//   .add('ChatInputField TextField comp fullWidth with ERROR', () => (
//     <ChatInputField
//       comp="TextField"
//       label="I'm the label"
//       value="I'm the value"
//       error="I'm the error"
//       fullWidth
//     />
//   ))
//   .add('ChatInputField TextField comp fullWidth DISABLED', () => (
//     <ChatInputField
//       comp="TextField"
//       label="I'm the label"
//       value="I'm the value"
//       disabled
//       fullWidth
//     />
//   ))
//   .add('ChatInputField Dropdown comp', () => (
//     <ChatInputField
//       comp="Dropdown"
//       label="I'm the label"
//       data={data}
//     />
//   ))
//   .add('ChatInputField Dropdown comp with ERROR', () => (
//     <ChatInputField
//       comp="Dropdown"
//       label="I'm the label"
//       data={data}
//       error="I'm the error"
//     />
//   ))
//   .add('ChatInputField Dropdown comp DISABLED', () => (
//     <ChatInputField
//       comp="Dropdown"
//       label="I'm the label"
//       data={data}
//       disabled
//     />
//   ))
//   .add('ChatInputField Dropdown comp fullWidth', () => (
//     <ChatInputField
//       comp="Dropdown"
//       label="I'm the label"
//       data={data}
//       fullWidth
//     />
//   ))
//   .add('ChatInputField Dropdown comp fullWidth with ERROR', () => (
//     <ChatInputField
//       comp="Dropdown"
//       label="I'm the label"
//       data={data}
//       error="I'm the error"
//       fullWidth
//     />
//   ))
//   .add('ChatInputField Dropdown comp fullWidth DISABLED', () => (
//     <ChatInputField
//       comp="Dropdown"
//       label="I'm the label"
//       data={data}
//       disabled
//       fullWidth
//     />
//   ))
//   .add('ChatInputField size S', () => (
//     <ChatInputField
//       comp="TextField"
//       label="I'm the label"
//       value="I'm the value"
//       size="S"
//     />
//   ))
//   .add('ChatInputField size ML', () => (
//     <ChatInputField
//       comp="TextField"
//       label="I'm the label"
//       value="I'm the value"
//       size="ML"
//     />
//   ))
//   .add('ChatInputField white theme', () => (
//     <Block bgColor={Colors.primaryGreen}>
//       <ChatInputField
//         comp="TextField"
//         label="I'm the label"
//         value="I'm the value"
//         theme="white"
//       />
//     </Block>
//   ))
//   .add('ChatInputField white theme with ERROR', () => (
//     <Block bgColor={Colors.primaryGreen}>
//       <ChatInputField
//         comp="TextField"
//         label="I'm the label"
//         value="I'm the value"
//         theme="white"
//         error="I'm the error"
//       />
//     </Block>
//   ));
