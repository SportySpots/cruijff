import PropTypes from 'prop-types';

export const navigation = PropTypes.shape({
  navigate: PropTypes.func.isRequired,
  goBack: PropTypes.func,
  state: PropTypes.shape({
    params: PropTypes.any,
  }).isRequired,
});
