import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import ModalProps from '../../../../RenderProps/modal-props';
import RaisedButton from '../../RaisedButton';
import SpotPickerModal from '.';

const Container = () => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => (
      <View>
        <RaisedButton
          label="Open Modal"
          onPress={openModal}
        />
        <SpotPickerModal
          visible={visible}
          onClose={closeModal}
          onSelect={closeModal}
        />
      </View>
    )}
  </ModalProps>
);

storiesOf('Modals.SpotPickerModal', module)
  .add('SpotPickerModal', () => <Container />);
