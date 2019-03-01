import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ImageSwiper from '.';

storiesOf('Common.ImageSwiper', module)
  .add('ImageSwiper', () => (
    <ImageSwiper
      images={[
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv2CxOJIZX-hrhUZzyBcZ8t3_aJ6Zo0VFvs_loZIEpl_SkXUWJ0JeLTf-A',
        'https://via.placeholder.com/350x150',
      ]}
    />
  ));
