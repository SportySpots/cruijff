import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import ModalProps from '../../../RenderProps/modal-props';
import RaisedButton from '../../Common/RaisedButton';
import EditGameDoneModal from './index';

const Container = () => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => (
      <View>
        <RaisedButton
          status="primary"
          label="Open"
          onPress={openModal}
        />
        <EditGameDoneModal
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
          status="primary"
          label="Open"
          onPress={() => {
            openModal();
            const handle = setTimeout(() => {
              closeModal();
              clearTimeout(handle);
            }, 2000);
          }}
        />
        <EditGameDoneModal
          visible={visible}
          closable={false}
        />
      </View>
    )}
  </ModalProps>
);

storiesOf('Games.EditGameDoneModal', module)
  .add('EditGameDoneModal', () => <Container />)
  .add('EditGameDoneModal with timeOut', () => <ContainerWithTimeout />);

