import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import I18n from '../../../../I18n/index';
import Colors from '../../../../Themes/Colors';
import GET_SPORTS from '../../../../GraphQL/Sports/Queries/GET_SPORTS';
import Text from '../../../../Components/Text';
import CenteredActivityIndicator from '../../../../Components/CenteredActivityIndicator';
import SportsList from './SportsList';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Outer = styled.View`
  flex: 1;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
`;
//------------------------------------------------------------------------------
const Inner = styled.View`
  flex: 1;
  background-color: ${Colors.white};
  margin: 36px;
  padding: 8px;
`;
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
          onRequestClose={() => onSelect(null)}
          transparent
        >
          <Outer>
            <Inner>
              <Text.L>{I18n.t('Choose sport')}</Text.L>
              <SportsList
                sports={data.sports || []}
                onSelect={onSelect}
              />
            </Inner>
          </Outer>
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
