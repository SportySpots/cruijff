import React from 'react';
import PropTypes from 'prop-types';
import Spacer from '../../Common/Spacer';
import ShareLink from '../ShareLink';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ShareForm = ({ link, onChange }) => [
  <Spacer key="sport-spacer" size="XL" />,
  <ShareLink
    key="link"
    link={link}
  />,
];

ShareForm.propTypes = {
  link: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

ShareForm.defaultProps = {
  onChange: () => {},
};

export default ShareForm;
