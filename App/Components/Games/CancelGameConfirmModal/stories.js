import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import ModalProps from '../../../RenderProps/modal-props';
import RaisedButton from '../../Common/RaisedButton';
import CancelGameConfirmModal from './index';

const Container = () => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => (
      <View>
        <RaisedButton
          variant="primary"
          label="Open"
          onPress={openModal}
        />
        <CancelGameConfirmModal
          visible={visible}
          onConfirm={closeModal}
          onClose={closeModal}
        />
      </View>
    )}
  </ModalProps>
);

storiesOf('Games.CancelGameConfirmModal', module)
  .add('CancelGameConfirmModal', () => <Container />);
