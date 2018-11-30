import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
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
  onChange,
}) => (
  <ScrollView>
    <Spacer size="XL" />
    <TextField
      // testID="title"
      label={I18n.t('Title')}
      placeholder={I18n.t('Title')}
      value={title}
      // characterRestriction={titleMaxChars}
      onChangeText={(value) => { onChange({ fieldName: 'title', value }); }}
      theme="white"
      size="ML"
    />
    <Spacer size="XL" />
    <TextField
      testID="description"
      label={I18n.t('Description')}
      placeholder={I18n.t('Write extra details about the activity')}
      value={description}
      multiline
      characterRestriction={descriptionMaxChars}
      onChangeText={(value) => { onChange({ fieldName: 'description', value }); }}
      theme="white"
    />
  </ScrollView>
);

DescriptionSlide.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  descriptionMaxChars: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

DescriptionSlide.defaultProps = {
  onChange: () => {},
};

export default DescriptionSlide;
