import React from 'react';
import PropTypes from 'prop-types';
// import { propType } from 'graphql-anywhere';
import { FlatList, TouchableOpacity } from 'react-native';
import I18n from '../../../I18n';
import { addGlobalRef } from '../../../globalRefs';
// import notificationFragment from '../../../GraphQL/Notification/Fragments/notification';
import NothingFound from '../../Common/NothingFound';
import Divider from '../../Common/Divider';
import NotificationCard from '../NotificationCard';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NotificationsList = ({
  notifications,
  onCardPress,
  refreshing,
  ...rest
}) => (
  <FlatList
    testID="notificationsFlatList"
    ref={addGlobalRef('notificationsFlatList')}
    showsVerticalScrollIndicator={false}
    data={notifications}
    keyExtractor={item => item.uuid}
    renderItem={({ item: notification }) => (
      <TouchableOpacity
        testID={`notification_${notification.uuid}`}
        key={notification.uuid}
        onPress={() => { onCardPress(notification); }}
        activeOpacity={1}
      >
        <NotificationCard notification={notification} />
      </TouchableOpacity>
    )}
    ListEmptyComponent={!refreshing && <NothingFound icon="whistle" text={I18n.t('notificationsList.noResults')} />}
    ItemSeparatorComponent={() => <Divider />}
    onEndReachedThreshold={0.1}
    contentContainerStyle={{
      flexGrow: 1, // centers not-found-component
      paddingVertical: 8,
    }}
    refreshing={refreshing}
    {...rest}
  />
);

NotificationsList.propTypes = {
  // notifications: PropTypes.arrayOf(propType(notificationFragment)),
  notifications: PropTypes.arrayOf(PropTypes.object),
  onCardPress: PropTypes.func,
  refreshing: PropTypes.bool,
};

NotificationsList.defaultProps = {
  notifications: [],
  onCardPress: () => {},
  refreshing: false,
};

export default NotificationsList;
