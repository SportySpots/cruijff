import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import ModalProps from '../../../../RenderProps/modal-props';
import Modal from './index';

const Container = () => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => (
      <View>
        <TouchableOpacity
          onPress={openModal}
          style={{ backgroundColor: 'red' }}
        >
          <Text style={{ textAlign: 'center' }}>
            Open
          </Text>
        </TouchableOpacity>
        <Modal visible={visible} onClose={closeModal}>
          <Text>I&apos;m the child component</Text>
        </Modal>
      </View>
    )}
  </ModalProps>
);

storiesOf('Common.Modal', module)
  .add('Modal no footer', () => <Container />);

