import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import ErrorHandling from 'error-handling-utils';
import cloneDeep from 'lodash/cloneDeep';
import I18n from '../../../I18n';
import Spacer from '../../Common/Spacer';
import TextField from '../../Common/TextField';

// TODO: update I18n names
// TODO: move descriptionMaxChars from PlanGame to this file
//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
export const DESCRIPTION_MAX_CHARS = 2000;

export const getInitState = ({ username }) => ({
  title: username ? I18n.t('planGameScreen.descriptionSlide.fields.title.defaultValue', { username }) : '',
  description: '',
});

export const INIT_ERRORS = {
  title: [],
  description: [],
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class TitleDescriptionSlide extends React.PureComponent {
  render() {
    const {
      title,
      description,
      errors,
      onChange,
    } = this.props;

    // Apply translation and concatenate field errors (string)
    const descriptionErrors = ErrorHandling.getFieldErrors(errors, 'description', I18n.t);

    return (
      <ScrollView>
        <Spacer size="XL" />
        <TextField
          // testID="title"
          label={I18n.t('planGameScreen.descriptionSlide.fields.title.label')}
          placeholder={I18n.t('planGameScreen.descriptionSlide.fields.title.placeholder')}
          value={title}
          // characterRestriction={titleMaxChars}
          onChangeText={(value) => { onChange({ fieldName: 'title', value }); }}
          theme="white"
          size="ML"
        />
        <Spacer size="XL" />
        <TextField
          testID="description"
          label={I18n.t('planGameScreen.descriptionSlide.fields.description.label')}
          placeholder={I18n.t('planGameScreen.descriptionSlide.fields.description.placeholder')}
          value={description}
          error={descriptionErrors}
          multiline
          autoFocus
          characterRestriction={DESCRIPTION_MAX_CHARS}
          onChangeText={(value) => { onChange({ fieldName: 'description', value }); }}
          theme="white"
        />
      </ScrollView>
    );
  }
}

TitleDescriptionSlide.title = 'planGameScreen.descriptionSlide.title'; // TODO: update using slide namespace
TitleDescriptionSlide.requiredFields = [];
TitleDescriptionSlide.nextBtnLabel = 'planGameScreen.descriptionSlide.footer.nextBtnLabel';

TitleDescriptionSlide.validateFields = ({ description }) => {
  // Initialize errors
  const errors = cloneDeep(INIT_ERRORS);
  if (description.length > DESCRIPTION_MAX_CHARS) {
    errors.description.push('planGameScreen.descriptionSlide.fields.description.errors.tooLong');
  }
  return errors;
};

TitleDescriptionSlide.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  errors: PropTypes.shape({
    description: PropTypes.arrayOf(PropTypes.string),
  }),
  onChange: PropTypes.func,
};

TitleDescriptionSlide.defaultProps = {
  ...cloneDeep(getInitState()),
  errors: cloneDeep(INIT_ERRORS),
  onChange: () => {},
};

export default TitleDescriptionSlide;
