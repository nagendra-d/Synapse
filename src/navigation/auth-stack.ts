import { createStackNavigator } from 'react-navigation';
import { AuthScreens } from './screens';
import LoginScreen from '../screens/login-screen';
import VerifyOtpScreen from '../screens/verify-otp-screen';
import GettingStartedScreen from '../screens/getting-started-screen';

export default createStackNavigator(
  {
    [AuthScreens.Login]: {
      screen: LoginScreen,
      path: 'login',
    },
    [AuthScreens.VerifyOtp]: VerifyOtpScreen,
    [AuthScreens.GettingStarted]: GettingStartedScreen,
  },
  {
    initialRouteName: AuthScreens.GettingStarted,
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
  },
);
