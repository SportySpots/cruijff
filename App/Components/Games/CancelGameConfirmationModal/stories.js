import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import ModalProps from '../../../RenderProps/modal-props';
import CancelGameConfirmationModal from './index';

const Container = () => (
  <ModalProps>
    {({ visible, open, close }) => (
      <View>
        <TouchableOpacity
          onPress={open}
          style={{ backgroundColor: 'red' }}
        >
          <Text style={{ textAlign: 'center' }}>
            Open
          </Text>
        </TouchableOpacity>
        <CancelGameConfirmationModal
          visible={visible}
          onClose={close}
        />
      </View>
    )}
  </ModalProps>
);

storiesOf('CancelGameConfirmationModal', module)
  .add('CancelGameConfirmationModal success', () => <Container />);

