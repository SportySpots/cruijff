import React from 'react'
import { storiesOf } from '@storybook/react-native'

import FieldBackground from '../../Containers/FieldBackground'
import defaultUiTheme from '../../Themes/UiThemes'
import { ThemeProvider } from 'react-native-material-ui'
import OnBoarding from '../OnBoarding'

storiesOf('OnBoarding')
  .add('Default', () => (
    <ThemeProvider uiTheme={defaultUiTheme}>
      <FieldBackground>
        <OnBoarding />
      </FieldBackground>
    </ThemeProvider>
  ))
