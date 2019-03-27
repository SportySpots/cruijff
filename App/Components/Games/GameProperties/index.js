import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import Colors from '../../../Themes/Colors';
import I18n from '../../../I18n';
import Text from '../../Common/Text';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Label = ({ children, ...rest }) => (
  <Text
    size="SM"
    color="black"
    style={{ flex: 1 }}
    {...rest}
  >
    {children}
  </Text>
);
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const GameProperties = ({ game, onSpotPress }) => {
  const {
    name,
    start_time: startTime,
    end_time: endTime,
    sport,
    spot,
  } = game;

  return (
    <View>
      <Text size="ML" color="black">
        {name}
      </Text>
      <Spacer size="L" />
      <Row>
        <Icon name="event" size={22} color={Colors.shade} />
        <Spacer row size="L" />
        <Label>
          {moment.utc(startTime).format('dddd, D MMMM').toTitleCase()}
        </Label>
      </Row>
      <Spacer size="M" />
      <Row>
        <Icon name="watch-later" size={22} color={Colors.shade} />
        <Spacer row size="L" />
        <Label>
          {`${moment.utc(startTime).local().format('HH:mm')} ${endTime ? ` - ${moment.utc(endTime).local().format('HH:mm')}` : ''}`}
        </Label>
      </Row>
      <Spacer size="M" />
      <Row>
        <Icon name="label" size={22} color={Colors.shade} />
        <Spacer row size="L" />
        <Label>
          {I18n.t(sport.category)}
        </Label>
      </Row>
      <Spacer size="M" />
      <TouchableOpacity
        onPress={() => {
          if (!spot || !spot.uuid) { return; }
          onSpotPress({ spotUUID: spot.uuid });
        }}
      >
        <Row>
          <Icon name="place" size={22} color={Colors.shade} />
          <Spacer row size="L" />
          <Label>{(spot && spot.name) || '?'}</Label>
        </Row>
      </TouchableOpacity>
    </View>
  );
};

GameProperties.propTypes = {
  game: propType(gameDetailsFragment).isRequired,
  onSpotPress: PropTypes.func,
};

GameProperties.defaultProps = {
  onSpotPress: () => {},
};

export default GameProperties;
