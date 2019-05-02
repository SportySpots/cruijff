import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import Text from '../../Common/Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexOneRow = styled(Row)`
  flex: 1; /* full width */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ChatWithGroup = ({ onChatPress }) => (
  <TouchableOpacity onPress={onChatPress}>
    <Row alignItems="center">
      <FlexOneRow alignItems="center">
        <Icon
          name="forum"
          size={24}
          color={Colors.black}
        />
        <Spacer row size="XL" />
        <Text size="M">
          {I18n.t('chatWithGroup.text')}
        </Text>
      </FlexOneRow>
      <Icon
        name="chevron-right"
        size={30}
        color={Colors.black}
      />
    </Row>
  </TouchableOpacity>
);

ChatWithGroup.propTypes = {
  onChatPress: PropTypes.func,
};

ChatWithGroup.defaultProps = {
  onChatPress: () => {},
};

export default ChatWithGroup;
