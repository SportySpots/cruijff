import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import ModalProps from '../../../../RenderProps/modal-props';
import RaisedButton from '../../RaisedButton';
import DialogModal from './index';

const Container = ({ withHeader, children }) => {
  const header = (
    <Text>I&apos;m the Header</Text>
  );
  const footer = (
    <Text>I&apos;m the footer</Text>
  );

  return (
    <ModalProps>
      {({ visible, openModal, closeModal }) => (
        <View>
          <RaisedButton
            status="primary"
            label="Open"
            onPress={openModal}
          />
          <DialogModal
            visible={visible}
            onClose={closeModal}
            withHeader={withHeader}
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
  withHeader: PropTypes.bool,
  children: PropTypes.oneOf([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
};

Container.defaultProps = {
  withHeader: true,
};

storiesOf('Modals.DialogModal', module)
  .add('DialogModal', () => (
    <Container>
      <Text>I&apos;m the child component</Text>
    </Container>
  ))
  .add('DialogModal big children', () => (
    <Container>
      <View style={{ height: 700, borderWidth: 1, borderColor: 'red' }}>
        <Text>I&apos;m the child component</Text>
      </View>
    </Container>
  ))
  .add('DialogModal big children no header', () => (
    <Container withHeader={false}>
      <View style={{ height: 400, borderWidth: 1, borderColor: 'red' }}>
        <Text>I&apos;m the child component</Text>
      </View>
    </Container>
  ));
