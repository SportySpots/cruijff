import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View, Text } from 'react-native';
import ModalProps from '../../../../RenderProps/modal-props';
import RaisedButton from '../../RaisedButton';
import ConfirmModal from '.';

const Container = () => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => (
      <View>
        <RaisedButton
          variant="primary"
          label="Open"
          onPress={openModal}
        />
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

storiesOf('Modals.ConfirmModal', module)
  .add('ConfirmModal', () => <Container />);
