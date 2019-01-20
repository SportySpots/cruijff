import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import themeImages from '../../../../Themes/Images';
import ModalProps from '../../../../RenderProps/modal-props';
import RaisedButton from '../../RaisedButton';
import ImageModal from '.';

const Container = props => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => (
      <View>
        <RaisedButton
          variant="primary"
          label="Open"
          onPress={openModal}
        />
        <ImageModal
          visible={visible}
          okBtnLabel="Ok"
          cancelBtnLabel="Cancel"
          onClose={closeModal}
          onOk={closeModal}
          onCancel={closeModal}
          title="I'm the title"
          subtitle="I'm the subtitle"
          src={themeImages.activityConfirmVisual || 123}
          {...props}
        />
      </View>
    )}
  </ModalProps>
);

storiesOf('Modals.ImageModal', module)
  .add('ImageModal ConfirmModal comp', () => (
    <Container modalComponent="ConfirmModal" />
  ))
  .add('ImageModal CancelConfirmModal comp', () => (
    <Container modalComponent="CancelConfirmModal" />
  ));
