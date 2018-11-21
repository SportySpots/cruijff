import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { View } from 'react-native';
import moment from 'moment';
import Colors from '../../../Themes/Colors';
import I18n from '../../../I18n';
import userDetailsFragment from '../../../GraphQL/Users/Fragments/userDetails';
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
        <Avatar user={user} />
        <Spacer row size="L" />
        <View>
          <Text.M>{`${user.first_name} ${user.last_name}`}</Text.M>
          <Text.SM style={{ color: Colors.gray }}>
            {`${I18n.t('signed up at')} `}
            {moment.utc(createdAt).local().format('D MMMM HH:mm')}
          </Text.SM>
        </View>
      </Row>
    </Block>
  );
};

PlayerRow.propTypes = {
  player: PropTypes.shape({
    user: propType(userDetailsFragment).isRequired,
    created_at: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
};

export default PlayerRow;
