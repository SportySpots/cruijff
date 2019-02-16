import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import ModalProps from '../../../../RenderProps/modal-props';
import RaisedButton from '../../RaisedButton';
import SportPickerModal from '.';

const Container = () => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => (
      <View>
        <RaisedButton
          label="Open Modal"
          onPress={openModal}
        />
        <SportPickerModal
          visible={visible}
          onClose={closeModal}
          onSelect={closeModal}
        />
      </View>
    )}
  </ModalProps>
);

storiesOf('Modals.SportPickerModal', module)
  .add('SportPickerModal', () => <Container />);
