import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: Colors.actionBlue
    },
    container: {
      flex: 1,
      backgroundColor: Colors.transparent,
      paddingTop: Metrics.baseMargin
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin
    },
    sectionText: {
      ...Fonts.style.normal,
      color: Colors.snow,
      textAlign: 'center',
      marginVertical: Metrics.smallMargin,
      paddingVertical: Metrics.doubleBaseMargin
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    titleText: {
      ...Fonts.style.h2,
      fontSize: 14,
      color: Colors.text
    }
  },
  darkLabelContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    marginBottom: Metrics.baseMargin
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
}

export default ApplicationStyles
