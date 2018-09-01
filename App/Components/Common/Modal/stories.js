import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import ModalProps from '../../../RenderProps/modal-props';
import Modal from './index';

const Container = () => (
  <ModalProps>
    {({ visible, open, close }) => (
      <View>
        <TouchableOpacity
          onPress={open}
          style={{ backgroundColor: 'red' }}
        >
          <Text style={{ textAlign: 'center' }}>
            Open
          </Text>
        </TouchableOpacity>
        <Modal
          visible={visible}
          onClose={close}
        >
          <Text>I&apos;m the child component</Text>
        </Modal>
      </View>
    )}
  </ModalProps>
);

storiesOf('Modal', module)
  .add('Modal', () => <Container />);

