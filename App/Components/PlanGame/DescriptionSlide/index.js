import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import ErrorHandling from 'error-handling-utils';
import I18n from '../../../I18n';
import Spacer from '../../Common/Spacer';
import TextField from '../../Common/TextField';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DescriptionSlide = ({
  title,
  description,
  descriptionMaxChars,
  errors,
  onChange,
}) => {
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
        characterRestriction={descriptionMaxChars}
        onChangeText={(value) => { onChange({ fieldName: 'description', value }); }}
        theme="white"
      />
    </ScrollView>
  );
}

DescriptionSlide.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  descriptionMaxChars: PropTypes.number.isRequired,
  errors: PropTypes.shape({
    description: PropTypes.arrayOf(String),
  }),
  onChange: PropTypes.func,
};

DescriptionSlide.defaultProps = {
  errors: {},
  onChange: () => {},
};

export default DescriptionSlide;
