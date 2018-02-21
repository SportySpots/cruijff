import { StyleSheet } from 'react-native'

export const themes = {
  light: StyleSheet.create({
    circle: {
      backgroundColor: '#f00'
    },
    active: {
      backgroundColor: '#0f0'
    }
  })
}

export const style = StyleSheet.create({
  outer: {
    flexDirection: 'row'
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5
  },
  active: {}
})
