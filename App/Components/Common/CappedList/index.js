import React from 'react';
import PropTypes from 'prop-types';

// TODO: linter

const CappedList = ({
  max, data, component, propsMap, capComponent, keyExtractor,
}) => {
  if (!keyExtractor) {
    let i = 0;
    keyExtractor = () => { i += 1; return i; };
  }

  if (!propsMap) {
    propsMap = item => item;
  }

  const itemMapper = item =>
    React.createElement(component, { key: keyExtractor(item), ...propsMap(item) });

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
  data: PropTypes.array.isRequired,
  component: PropTypes.func.isRequired,
  propsMap: PropTypes.func,
  capComponent: PropTypes.func,
  keyExtractor: PropTypes.func,
};

export default CappedList;
