import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import I18n from '../../../I18n';
import TextField from '../../Common/TextField';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DescriptionSlide = ({ description, descriptionMaxChars, onChange }) => (
  <ScrollView>
    <TextField
      testID="description"
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
  description: PropTypes.string.isRequired,
  descriptionMaxChars: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

DescriptionSlide.defaultProps = {
  onChange: () => {},
};

export default DescriptionSlide;
