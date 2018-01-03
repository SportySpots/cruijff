import React from 'react'
import { storiesOf } from '@storybook/react-native'

import FieldBackground from '../FieldBackground'
import AskLocation from '../AskLocation'
import defaultUiTheme from '../../Themes/UiThemes'
import { ThemeProvider } from 'react-native-material-ui'

storiesOf('AskLocation')
  .add('Default', () => (
    <ThemeProvider uiTheme={defaultUiTheme}>
      <FieldBackground>
        <AskLocation />
      </FieldBackground>
    </ThemeProvider>
  ))
