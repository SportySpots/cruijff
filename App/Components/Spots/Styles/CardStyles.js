import { StyleSheet } from 'react-native'
import Colors from '../../../Themes/Colors'

export const card = StyleSheet.create({
  container: {
    height: 240
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
    padding: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  }
})

export const cardSmall = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: 'row'
  },
  image: {
    flex: 1
    // borderTopLeftRadius: 8,
    // borderTopRightRadius: 8
  },
  details: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: Colors.white,
    padding: 8
    // borderBottomLeftRadius: 16,
    // borderBottomRightRadius: 16
  }
})

export const header = StyleSheet.create({
  belowName: {
    flexDirection: 'row',
    marginTop: 8
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
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    elevation: 2
    // overflow: 'hidden'
  }
})
