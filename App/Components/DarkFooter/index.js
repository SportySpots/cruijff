import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import I18n from '../../I18n';
import Colors from '../../Themes/Colors';
import NavDots from '../Common/NavDots';
import Row from '../Common/Row';
import Spacer from '../Common/Spacer';
import DarkFooterButton from '../DarkFooterButton';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  height: 50;
  background-color: ${Colors.black};
`;
//------------------------------------------------------------------------------
const StyledRow = styled(Row)`
  flex: 1; /* full width/height */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: move to common folder
const DarkFooter = ({
  numPages,
  currentPage,
  buttonNextText,
  onNext,
  showNext,
  disableNext,
  buttonBackText,
  onBack,
  showBack,
  disableBack,
}) => (
  <Container>
    <StyledRow alignItems="center">
      <Spacer orientation="row" size="S" />
      <StyledRow justifyContent="flex-start">
        {showBack && (
          <DarkFooterButton
            text={buttonBackText}
            onPress={onBack}
            disabled={disableBack}
            isBack
          />
        )}
      </StyledRow>
      <NavDots
        count={numPages}
        activeIndex={currentPage}
      />
      <StyledRow justifyContent="flex-end">
        {showNext && (
          <DarkFooterButton
            text={buttonNextText}
            onPress={onNext}
            disabled={disableNext}
          />
        )}
      </StyledRow>
      <Spacer orientation="row" size="S" />
    </StyledRow>
  </Container>
);

DarkFooter.propTypes = {
  numPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  buttonNextText: PropTypes.string,
  onNext: PropTypes.func,
  showNext: PropTypes.bool,
  disableNext: PropTypes.bool,
  buttonBackText: PropTypes.string,
  onBack: PropTypes.func,
  showBack: PropTypes.bool,
  disableBack: PropTypes.bool,
};

DarkFooter.defaultProps = {
  buttonNextText: I18n.t('continue'),
  showNext: true,
  onNext: () => {},
  disableNext: false,
  buttonBackText: I18n.t('back'),
  onBack: () => {},
  showBack: true,
  disableBack: false,
};

export default DarkFooter;
