import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducers } from '.';

const store = createStore(reducers);

const ReduxProvider = ({ children }) => (
  <Provider store={store}>
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      {children}
    </ScrollView>
  </Provider>
);

ReduxProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ReduxProvider;
