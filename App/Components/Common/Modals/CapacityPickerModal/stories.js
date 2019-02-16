import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import ModalProps from '../../../../RenderProps/modal-props';
import RaisedButton from '../../RaisedButton';
import CapacityPickerModal from '.';

const Container = () => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => (
      <View>
        <RaisedButton
          label="Open Modal"
          onPress={openModal}
        />
        <CapacityPickerModal
          visible={visible}
          onSelect={closeModal}
          onClose={closeModal}
        />
      </View>
    )}
  </ModalProps>
);

storiesOf('Modals.CapacityPickerModal', module)
  .add('CapacityPickerModal', () => <Container />);
