import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import { WithApolloMockProvider } from '../../../../GraphQL';
import ModalProps from '../../../../RenderProps/modal-props';
import RaisedButton from '../../RaisedButton';
import SportPickerModal from './index';

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
          // okBtnLabel="Ok"
          // onOk={closeModal}
        />
      </View>
    )}
  </ModalProps>
);

storiesOf('Modals.SportPickerModal', module)
  .add('SportPickerModal', () => (
    <WithApolloMockProvider>
      <Container />
    </WithApolloMockProvider>
  ));