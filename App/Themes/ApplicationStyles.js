import Fonts from './Fonts';
import Metrics from './Metrics';
import Colors from './Colors';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.transparent,
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    container: {
      flex: 1,
      paddingTop: Metrics.baseMargin,
      backgroundColor: Colors.transparent,
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin,
    },
    sectionText: {
      ...Fonts.style.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.snow,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center',
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin,
    },
    titleText: {
      ...Fonts.style.h2,
      fontSize: 14,
      color: Colors.text,
    },
    bold: {
      fontWeight: '600',
    },
  },
  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: Metrics.baseMargin,
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow,
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color: Colors.coal,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: 'center',
    textAlign: 'center',
  },
  headerView: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 15,
    flex: 1,
  },
  headerImage: {
    height: 36,
    width: 36,
  },
  cardItemViewContainer: {
    height: Metrics.screenHeight * 0.68,
    width: Metrics.screenWidth,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f4f7f9',
  },
  cardItemImage: {
    height: Metrics.screenHeight * 0.68,
    width: Metrics.screenWidth * 0.96,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginTop: 7,
  },
  cardItemViewLinear: {
    height: Metrics.screenHeight * 0.68,
    width: Metrics.screenWidth * 0.96,
    position: 'absolute',
    borderRadius: 10,
    top: 7,
    justifyContent: 'space-between',
  },
  cardItemLinearGradient: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    height: 200,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    paddingLeft: 15,
  },
  cardItemViewName: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  cardItemTextName: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'SFUIText-Bold',
  },
  cardItemLocationText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 7,
  },
  directionRow: {flexDirection: 'row'},
  animationLoveLike: {
    width: Metrics.screenWidth * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 18,
  },
  loveView: {
    height: 48,
    width: 144,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#0fd68b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loveText: {
    color: '#0fd68b',
    fontSize: 26,
    fontFamily: 'SFUIText-Heavy',
  },
  ignoreView: {
    height: 48,
    width: 144,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#ff3242',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  ignoreText: {
    color: '#ff3242',
    fontSize: 26,
    fontFamily: 'SFUIText-Heavy',
  },
};

export default ApplicationStyles;
