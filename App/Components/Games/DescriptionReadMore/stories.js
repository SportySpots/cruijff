import React from 'react';
import { storiesOf } from '@storybook/react-native';
import DescriptionReadMore from '.';

storiesOf('Games.DescriptionReadMore', module)
  .add('DescriptionReadMore', () => (
    <DescriptionReadMore description="Some description" />
  ))
  .add('DescriptionReadMorelong description', () => (
    <DescriptionReadMore description="Some reaaaally loooong description Some reaaaally loooong description Some reaaaally loooong description Some reaaaally loooong description Some reaaaally loooong description Some reaaaally loooong description Some reaaaally loooong descriptionSome reaaaally loooong description" />
  ));
