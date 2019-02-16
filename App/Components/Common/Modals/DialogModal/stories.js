import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import ModalProps from '../../../../RenderProps/modal-props';
import RaisedButton from '../../RaisedButton';
import DialogModal from '.';

const Container = ({ header, children }) => {
  const footer = <Text>I&apos;m the footer</Text>;

  return (
    <ModalProps>
      {({ visible, openModal, closeModal }) => (
        <View>
          <RaisedButton
            variant="primary"
            label="Open"
            onPress={openModal}
          />
          <DialogModal
            visible={visible}
            onClose={closeModal}
            header={header}
            footer={footer}
          >
            {children}
          </DialogModal>
        </View>
      )}
    </ModalProps>
  );
};

Container.propTypes = {
  header: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
};

Container.defaultProps = {
  header: null,
};

const header = <Text>I&apos;m the Header</Text>;

storiesOf('Modals.DialogModal', module)
  .add('DialogModal', () => (
    <Container header={header}>
      <Text>I&apos;m the child component</Text>
    </Container>
  ))
  .add('DialogModal big children', () => (
    <Container header={header}>
      <View style={{ height: 700, borderWidth: 1, borderColor: 'red' }}>
        <Text>I&apos;m the child component</Text>
      </View>
    </Container>
  ))
  .add('DialogModal big children no header', () => (
    <Container>
      <View style={{ height: 400, borderWidth: 1, borderColor: 'red' }}>
        <Text>I&apos;m the child component</Text>
      </View>
    </Container>
  ));
