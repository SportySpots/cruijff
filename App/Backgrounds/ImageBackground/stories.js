import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View, Text } from 'react-native';
import Images from '../../Themes/Images';
import ImageBackground from '.';

storiesOf('Backgrounds.ImageBackground', module)
  .add('ImageBackground Title Text', () => (
    <ImageBackground
      image={Images.illustrationWizard1}
      title="I'm the title"
      text="I'm the text"
    />
  ))
  .add('ImageBackground Children', () => (
    <ImageBackground
      image={Images.illustrationWizard1}
    >
      <View>
        <Text>Hello, I&apos;m the child</Text>
      </View>
    </ImageBackground>
  ));
