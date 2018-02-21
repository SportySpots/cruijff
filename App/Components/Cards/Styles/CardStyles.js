import { StyleSheet } from 'react-native'
import Colors from '../../../Themes/Colors'

export const card = StyleSheet.create({
  container: {
    height: 200
  },
  image: {
    flex: 3,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  bottom: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
    padding: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  }
})

export const header = StyleSheet.create({
  belowName: {
    flexDirection: 'row',
    marginTop: 4
  },
  spacer: {
    marginLeft: 8,
    marginRight: 8
  },
  plannedGamesCount: {
    color: Colors.actionYellow
  }
})

export const cardList = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    backgroundColor: Colors.bgGrey
  },

  cardContainer: {
    margin: 4,
    borderWidth: 1,
    borderColor: Colors.black54,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 1,
    shadowColor: 'black',
    shadowOpacity: 1.0
  }
})

export const cardDetails = StyleSheet.create({
  container: {
    flex: 1
  },
  slider: {
    height: 200
  },
  bottom: {
    padding: 8
  }
})
