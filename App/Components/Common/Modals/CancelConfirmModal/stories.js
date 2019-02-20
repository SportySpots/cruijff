import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View, Text } from 'react-native';
import ModalProps from '../../../../RenderProps/modal-props';
import RaisedButton from '../../RaisedButton';
import CancelConfirmModal from '.';

const Container = () => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => (
      <View>
        <RaisedButton
          variant="primary"
          label="Open"
          onPress={openModal}
        />
        <CancelConfirmModal
          visible={visible}
          onClose={closeModal}
          okBtnLabel="Ok"
          cancelBtnLabel="Cancel"
          onOk={closeModal}
          onCancel={closeModal}
        >
          <Text>I&apos;m the child component</Text>
        </CancelConfirmModal>
      </View>
    )}
  </ModalProps>
);

storiesOf('Modals.CancelConfirmModal', module)
  .add('CancelConfirmModal', () => <Container />);
