import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import ShareGameButton from '../ShareGameButton';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const MaxWidth = styled.View`
  width: 100%;
  max-width: 340px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ShareGameButtons = ({ shareLink }) => {
  const childProps = { shareLink };

  return (
    <MaxWidth>
      <Row alignItems="center" justifyContent="space-between">
        <ShareGameButton variant="whatsapp" {...childProps} />
        <ShareGameButton variant="facebook" {...childProps} />
        <ShareGameButton variant="email" {...childProps} />
        <ShareGameButton variant="native" {...childProps} />
        <Spacer row size="XL" />
      </Row>
    </MaxWidth>
  );
};

ShareGameButtons.propTypes = {
  shareLink: PropTypes.string.isRequired,
};

export default ShareGameButtons;
