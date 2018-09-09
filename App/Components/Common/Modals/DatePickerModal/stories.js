/* import { storiesOf } from '@storybook/react-native';
import React from 'react';
import DatePickerModal from './index';

storiesOf('Modals.DatePickerModal', module)
  .add('DatePickerModal', () => (
    <DatePickerModal
      visible
      okBtnLabel="Ok"
    />
  ));
*/

import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View, Text } from 'react-native';
import ModalProps from '../../../../RenderProps/modal-props';
import RaisedButton from '../../RaisedButton';
import DatePickerModal from './index';

const Container = () => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => (
      <View>
        <RaisedButton
          label="Open Modal"
          onPress={openModal}
        />
        <DatePickerModal
          visible={visible}
          onClose={closeModal}
          okBtnLabel="Ok"
          onOk={closeModal}
        />
      </View>
    )}
  </ModalProps>
);

storiesOf('Modals.DatePickerModal', module)
  .add('DatePickerModal', () => <Container />);
