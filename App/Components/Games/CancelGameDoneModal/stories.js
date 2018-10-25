import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import ModalProps from '../../../RenderProps/modal-props';
import RaisedButton from '../../Common/RaisedButton';
import CancelGameDoneModal from './index';

const Container = () => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => (
      <View>
        <RaisedButton
          variant="primary"
          label="Open"
          onPress={openModal}
        />
        <CancelGameDoneModal
          visible={visible}
          onClose={closeModal}
        />
      </View>
    )}
  </ModalProps>
);

const ContainerWithTimeout = () => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => (
      <View>
        <RaisedButton
          variant="primary"
          label="Open"
          onPress={() => {
            openModal();
            const handle = setTimeout(() => {
              closeModal();
              clearTimeout(handle);
            }, 2000);
          }}
        />
        <CancelGameDoneModal
          visible={visible}
          closable={false}
        />
      </View>
    )}
  </ModalProps>
);

storiesOf('Games.CancelGameDoneModal', module)
  .add('CancelGameDoneModal', () => <Container />)
  .add('CancelGameDoneModal with timeOut', () => <ContainerWithTimeout />);

