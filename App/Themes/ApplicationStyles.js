import Colors from './Colors';
import Fonts from './Fonts';
import Metrics from './Metrics';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: Colors.white,
    },
    container: {
      flex: 1,
      backgroundColor: Colors.transparent,
      paddingTop: Metrics.baseMargin,
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    section: {
      flex: 1,
      margin: Metrics.section,
      padding: Metrics.smallMargin,
    },
    sectionText: {
      ...Fonts.style.normal,
      textAlign: 'center',
      marginVertical: Metrics.smallMargin,
      paddingVertical: Metrics.doubleBaseMargin,
    },
    titleText: {
      ...Fonts.style.h2,
      color: Colors.text,
    },
    subtitle: {
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin,
    },
  },
};

export default ApplicationStyles;
