import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import ModalProps from '../../../../RenderProps/modal-props';
import RaisedButton from '../../RaisedButton';
import Modal from '.';

const Container = ({ children }) => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => (
      <View>
        <RaisedButton
          label="Open Modal"
          onPress={openModal}
        />
        <Modal visible={visible} onClose={closeModal}>
          {children}
        </Modal>
      </View>
    )}
  </ModalProps>
);

console.log(PropTypes.node);

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
};

storiesOf('Modals.Modal', module)
  .add('Modal no footer', () => (
    <Container>
      <Text>I&apos;m the child component</Text>
    </Container>
  ))
  .add('Modal no footer big children', () => (
    <Container>
      <View style={{ height: 400, borderWidth: 1, borderColor: 'red' }}>
        <Text>I&apos;m the child component</Text>
      </View>
    </Container>
  ))
  .add('Modal no footer overflow children', () => (
    <Container>
      <View style={{ height: 800, borderWidth: 1, borderColor: 'red' }}>
        <Text>I&apos;m the child component</Text>
      </View>
    </Container>
  ));

