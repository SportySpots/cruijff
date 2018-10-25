import React from 'react';
import PropTypes from 'prop-types';
import { makeNumGenerator } from '../../../utils';

const CappedList = ({
  max, data, component, propsMap, capComponent, keyExtractor, ItemSeparatorComponent,
}) => {
  const itemMapper = limit => (
    (item, index) => [
      React.createElement(component, { key: keyExtractor(item), ...propsMap(item) }),
      index < limit - 1 && <ItemSeparatorComponent key={`separator-${keyExtractor(item)}`} />,
    ]
  );

  if (max >= data.length) {
    return data.map(itemMapper(data.length));
  }

  const maxIndex = max - (capComponent ? 1 : 0);

  return [
    ...data.slice(0, maxIndex).map(itemMapper(max)),
    capComponent ? React.createElement(capComponent, {
      key: 'cap',
      data: data.slice(maxIndex),
    }) : null,
  ];
};

CappedList.propTypes = {
  max: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.any),
  component: PropTypes.func.isRequired,
  propsMap: PropTypes.func,
  capComponent: PropTypes.func,
  keyExtractor: PropTypes.func,
  ItemSeparatorComponent: PropTypes.func,
};

CappedList.defaultProps = {
  propsMap: item => item,
  keyExtractor: makeNumGenerator(),
  ItemSeparatorComponent: () => null,
};

export default CappedList;

/*
import React from 'react';
import PropTypes from 'prop-types';
import { makeNumGenerator } from '../../../utils';

const CappedList = ({
  max, data, component, propsMap, capComponent, keyExtractor, ItemSeparatorComponent,
}) => {
  const itemMapper = item => [
    React.createElement(component, { key: keyExtractor(item), ...propsMap(item) }),
    <ItemSeparatorComponent key={`separator-${keyExtractor(item)}`} />,
  ];

  if (max >= data.length) {
    return data.map(itemMapper);
  }

  const maxIndex = max - (capComponent ? 1 : 0);

  return [
    ...data.slice(0, maxIndex).map(itemMapper),
    capComponent ? React.createElement(capComponent, {
      key: 'cap',
      data: data.slice(maxIndex),
    }) : null,
  ];
};

CappedList.propTypes = {
  max: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.any),
  component: PropTypes.func.isRequired,
  propsMap: PropTypes.func,
  capComponent: PropTypes.func,
  keyExtractor: PropTypes.func,
  ItemSeparatorComponent: PropTypes.func,
};

CappedList.defaultProps = {
  propsMap: item => item,
  keyExtractor: makeNumGenerator(),
  ItemSeparatorComponent: () => null,
};

export default CappedList;

*/
