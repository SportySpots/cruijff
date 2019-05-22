import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import moment from 'moment';
import I18n from '../../../I18n';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import Text from '../../Common/Text';
import Avatar from '../../Common/Avatar';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const PlayerRow = ({ player }) => {
  const { user, created_at: createdAt } = player;

  return (
    <Block>
      <Row alignItems="center">
        <Avatar user={user} size="S" />
        <Spacer row size="L" />
        <View>
          <Text size="M">{user.name}</Text>
          <Text size="SM" color="gray">
            {`${I18n.t(player.status === 'ATTENDING' ? 'playerRow.signedUpOn' : 'playerRow.signedOutOn')} ${moment.utc(createdAt).local().format('D MMMM HH:mm')}`}
          </Text>
        </View>
      </Row>
    </Block>
  );
};

PlayerRow.propTypes = {
  player: PropTypes.shape({
    user: Avatar.propTypes.user.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default PlayerRow;
