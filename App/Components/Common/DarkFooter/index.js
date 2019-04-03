import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/native';
import I18n from '../../../I18n';
import { addGlobalRef } from '../../../globalRefs';
import NavDots from '../NavDots';
import Row from '../Row';
import Spacer from '../Spacer';
import DarkFooterButton from '../DarkFooterButton';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  height: 50px;
  background-color: ${({ theme }) => theme.colors.black};
`;
//------------------------------------------------------------------------------
const StyledRow = styled(Row)`
  flex: 1; /* full width/height */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
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
      <Spacer row size="S" />
      <StyledRow justifyContent="flex-start">
        {showBack && (
          <DarkFooterButton
            ref={addGlobalRef('footerBackButton')}
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
            testID="footerNextButton"
            text={buttonNextText}
            onPress={onNext}
            disabled={disableNext}
          />
        )}
      </StyledRow>
      <Spacer row size="S" />
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
  buttonNextText: I18n.t('darkFooter.nextBtnLabel'),
  showNext: true,
  onNext: () => {},
  disableNext: false,
  buttonBackText: I18n.t('darkFooter.backBtnLabel'),
  onBack: () => {},
  showBack: true,
  disableBack: false,
};

export default DarkFooter;
