import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
import { Query } from 'react-apollo';
import I18n from '../../../../I18n/index';
import GET_SPORTS from '../../../../GraphQL/Sports/Queries/GET_SPORTS';
import Text from '../../../../Components/Text';
import CenteredActivityIndicator from '../../../../Components/CenteredActivityIndicator';
import SportsList from './SportsList';
import { ModalOuter, ModalInner } from '../../style';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SportsModal = ({ visible, onSelect }) => (
  <Query query={GET_SPORTS}>
    {({ loading, error, data }) => {
      if (loading) { return <CenteredActivityIndicator />; }
      if (error || !data) { return null; }

      return (
        <Modal
          visible={visible}
          animationType="fade"
          onRequestClose={() => { onSelect(null); }}
          transparent
        >
          <ModalOuter>
            <ModalInner>
              <Text.L>{I18n.t('Choose sport')}</Text.L>
              <SportsList
                sports={data.sports || []}
                onSelect={onSelect}
              />
            </ModalInner>
          </ModalOuter>
        </Modal>
      );
    }}
  </Query>
);

SportsModal.propTypes = {
  visible: PropTypes.bool,
  onSelect: PropTypes.func,
};

SportsModal.defaultProps = {
  visible: false,
  onSelect: () => {},
};

export default SportsModal;
