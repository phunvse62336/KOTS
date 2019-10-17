import Fonts from './Fonts';
import Metrics from './Metrics';
import Colors from './Colors';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  headerView: {
    height: 56,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 15,
    elevation: 1,
  },
  headerText: {color: Colors.appColor, fontWeight: 'bold', fontSize: 20},
};

export default ApplicationStyles;
