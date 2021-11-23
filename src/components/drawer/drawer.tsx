// External imports
// React & React Native
import * as React from 'react';
import { DrawerActions, DrawerItemsProps } from 'react-navigation';
import { Avatar } from 'react-native-elements';
import Constants from 'expo-constants';

import {
  AppScreens,
  AuthScreens,
  PreloadScreens,
} from '../../navigation/screens';

import {
  AppVersionText,
  AppVersionWrapper,
  DrawerHeaderText,
  DrawerHeaderTextWrapper,
  DrawerItemText,
  DrawerTopContainer,
  HeaderContainer,
  HeaderContent,
  MenuItem,
  Separator,
  TouchableDrawerItem,
} from './drawer-styled';
import { View } from 'react-native';

class Drawer extends React.Component<DrawerProps> {
  private onDrawerItemClick = (
    screen: AppScreens | AuthScreens | PreloadScreens,
  ) => {
    const { navigation } = this.props;
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate(screen);
  };

  private renderMenuItem = (
    screen: AppScreens | AuthScreens | PreloadScreens,
    label: string,
  ) => {
    return (
      <TouchableDrawerItem
        onPress={() => this.onDrawerItemClick(screen)}
        testID={label}
      >
        <MenuItem>
          <DrawerItemText>{label}</DrawerItemText>
        </MenuItem>
      </TouchableDrawerItem>
    );
  };

  /*private renderUnauthenticatedItems = () => {
    return (
      <DrawerTopContainer>
        {this.renderMenuItem(AppScreens.Home, 'About')}
        {this.renderMenuItem(AppScreens.Home, 'Support')}
        <Separator />
        <AppVersionWrapper>
          <AppVersionText>v.{Constants.manifest.version}</AppVersionText>
        </AppVersionWrapper>
      </DrawerTopContainer>
    );
  };*/

  private renderAuthenticatedItems = () => {
    return (
      <DrawerTopContainer testID='authenticatedDrawerItems'>
        {this.renderMenuItem(AppScreens.Home, 'My Account')}
        <Separator />
        <AppVersionWrapper>
          <AppVersionText>v.{Constants.manifest.version}</AppVersionText>
        </AppVersionWrapper>
      </DrawerTopContainer>
    );
  };

  private renderHeader = () => {
    return (
      <HeaderContainer testID='drawer'>
        <HeaderContent onPress={() => console.log('Hello')}>
          <Avatar size={60} title={'N'} />
          <DrawerHeaderTextWrapper>
            <DrawerHeaderText
              hasRightMargin={false}
              numberOfLines={2}
              testID='drawerHeaderText'
            >
              Sign up
            </DrawerHeaderText>
          </DrawerHeaderTextWrapper>
        </HeaderContent>
      </HeaderContainer>
    );
  };

  public render() {
    return (
      <View>
        {this.renderHeader()}
        {this.renderAuthenticatedItems()}
      </View>
    );
  }
}

type OwnProps = DrawerItemsProps;

type StateProps = {};

type DrawerProps = OwnProps & StateProps;

export default Drawer;
