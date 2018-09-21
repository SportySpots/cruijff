import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View, Text } from 'react-native';
import ModalProps from '../../../../RenderProps/modal-props';
import RaisedButton from '../../RaisedButton';
import DialogModal from './index';

const Container = () => {
  const footer = (
    <View>
      <Text>I&apos;m the footer</Text>
    </View>
  );

  return (
    <ModalProps>
      {({ visible, openModal, closeModal }) => (
        <View>
          <RaisedButton
            status="primary"
            label="Open"
            onPress={openModal}
          />
          <DialogModal
            visible={visible}
            onClose={closeModal}
            footer={footer}
          >
            <Text>I&apos;m the child component</Text>
          </DialogModal>
        </View>
      )}
    </ModalProps>
  );
};

storiesOf('Modals.DialogModal', module)
  .add('DialogModal', () => <Container />);
