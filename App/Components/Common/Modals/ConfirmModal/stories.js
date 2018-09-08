import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import ModalProps from '../../../../RenderProps/modal-props';
import ConfirmModal from './index';

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
        <ConfirmModal
          visible={visible}
          onClose={closeModal}
          okBtnLabel="Ok"
          onOk={closeModal}
        >
          <Text>I&apos;m the child component</Text>
        </ConfirmModal>
      </View>
    )}
  </ModalProps>
);

storiesOf('Common.ConfirmModal', module)
  .add('ConfirmModal', () => <Container />);
