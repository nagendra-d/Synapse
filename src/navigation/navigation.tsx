import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { PreloadScreens } from './screens';
import AuthLoadingScreen from '../screens/auth-loading-screen';
import AuthStack from './auth-stack';
import AppStack from './app-stack';

const SwitchNavigator = createSwitchNavigator(
  {
    [PreloadScreens.AuthLoading]: {
      screen: AuthLoadingScreen,
      path: '',
    },
    [PreloadScreens.Auth]: {
      screen: AuthStack,
      path: '',
    },
    [PreloadScreens.App]: {
      screen: AppStack,
      path: '',
    },
  },
  {
    initialRouteName: PreloadScreens.AuthLoading,
  },
);

export default createAppContainer(SwitchNavigator);
