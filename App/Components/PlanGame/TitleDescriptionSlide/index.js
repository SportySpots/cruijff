import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import ErrorHandling from 'error-handling-utils';
import cloneDeep from 'lodash/cloneDeep';
import I18n from '../../../I18n';
import Spacer from '../../Common/Spacer';
import TextField from '../../Common/TextField';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
export const TITLE_MAX_CHARS = 80;
export const DESCRIPTION_MAX_CHARS = 2000;

export const getInitState = username => ({
  title: username ? I18n.t('titleDescriptionSlide.fields.title.defaultValue', { username }) : '',
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
    const titleErrors = ErrorHandling.getFieldErrors(errors, 'title', I18n.t);
    const descriptionErrors = ErrorHandling.getFieldErrors(errors, 'description', I18n.t);

    return (
      <ScrollView>
        <Spacer size="XL" />
        <TextField
          testID="title"
          label={I18n.t('titleDescriptionSlide.fields.title.label')}
          placeholder={I18n.t('titleDescriptionSlide.fields.title.placeholder')}
          value={title}
          error={titleErrors}
          multiline
          characterRestriction={TITLE_MAX_CHARS}
          onChangeText={(value) => { onChange({ fieldName: 'title', value }); }}
          theme="white"
          size="ML"
        />
        <Spacer size="XL" />
        <TextField
          testID="description"
          label={I18n.t('titleDescriptionSlide.fields.description.label')}
          placeholder={I18n.t('titleDescriptionSlide.fields.description.placeholder')}
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

TitleDescriptionSlide.title = 'titleDescriptionSlide.title';
TitleDescriptionSlide.requiredFields = ['title'];
TitleDescriptionSlide.nextBtnLabel = 'titleDescriptionSlide.footer.nextBtnLabel';

TitleDescriptionSlide.validateFields = ({ title, description }) => {
  // Initialize errors
  const errors = cloneDeep(INIT_ERRORS);

  // Sanitize input
  const _title = title && title.trim(); // eslint-disable-line no-underscore-dangle

  if (!_title) {
    errors.title.push('titleDescriptionSlide.fields.title.errors.required');
  } else if (title.length > TITLE_MAX_CHARS) {
    errors.title.push('titleDescriptionSlide.fields.title.errors.tooLong');
  }

  // Sanitize input
  const _description = description && description.trim(); // eslint-disable-line no-underscore-dangle

  if (_description.length > DESCRIPTION_MAX_CHARS) {
    errors.description.push('titleDescriptionSlide.fields.description.errors.tooLong');
  }

  return errors;
};

TitleDescriptionSlide.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  errors: PropTypes.shape({
    title: PropTypes.arrayOf(PropTypes.string),
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
