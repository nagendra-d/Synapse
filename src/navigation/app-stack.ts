import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { AppScreens } from './screens';
//import Drawer from '../components/home/drawer/drawer';
import HomeScreen from '../screens/home-screen';
import CreateContactScreen from '../screens/create-contact-screen';
import ContactsScreen from '../screens/contacts-screen';

import { MODAL_OVERLAY_COLOR_OPAQUE } from '../constants/colors';
import Drawer from '../components/drawer/drawer';
import ChatScreen from '../screens/chat-screen';

export default createDrawerNavigator(
  {
    Root: {
      screen: createStackNavigator(
        {
          [AppScreens.Home]: HomeScreen,
          [AppScreens.CreateContact]: CreateContactScreen,
          [AppScreens.Chat]: ChatScreen,
          [AppScreens.Contacts]: ContactsScreen,
        },
        {
          initialRouteName: AppScreens.Home,
          headerMode: 'none',
        },
      ),
      path: '',
    },
  },
  {
    contentComponent: Drawer,
    overlayColor: MODAL_OVERLAY_COLOR_OPAQUE,
  },
);
