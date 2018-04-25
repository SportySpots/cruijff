import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import faker from 'faker'
configure({ adapter: new Adapter() })

// Mock your external modules here if needed
jest
.mock('react-native-i18n', () => {
  const english = require('../App/I18n/languages/english.json')
  const keys = require('ramda')
  const replace = require('ramda')
  const forEach = require('ramda')

  return {
    t: (key, replacements) => {
      let value = english[key]
      if (!value) return key
      if (!replacements) return value

      forEach((r) => {
        value = replace(`{{${r}}}`, replacements[r], value)
      }, keys(replacements))
      return value
    }
  }
})

jest.mock('../App/Themes/Images.js', () => jest.fn())
jest.mock('../node_modules/react-native-calendars/src/calendar/img/next.png', () => jest.fn())
jest.mock('../node_modules/react-native-calendars/src/calendar/img/previous.png', () => jest.fn())

// give faker a fixed seed to have consistent test results
faker.seed(1)
