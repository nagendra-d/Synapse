// External imports
// React & React Native
import React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
// Expo
// @ts-ignore
// Relative imports
// Global state
// Components
// Screens
import { AppScreens, AuthScreens } from '../navigation/screens';
// Types
import { View } from 'react-native';
import { connect } from 'react-redux';
import { AppState } from '../state/types';

class AuthLoadingScreen extends React.Component<AuthLoadingScreenProps> {
  constructor(props: AuthLoadingScreenProps) {
    super(props);
    this.initialize();
  }

  private async initialize() {
    const { navigation, isFirstTimeVisit } = this.props;
    if (!isFirstTimeVisit) {
      navigation.navigate(AuthScreens.GettingStarted);
    } else {
      navigation.navigate(AppScreens.Home);
    }
  }

  public render() {
    return <View />;
  }
}

type OwnProps = NavigationInjectedProps;

type StateProps = {
  isFirstTimeVisit: boolean;
};

type AuthLoadingScreenProps = OwnProps & StateProps;

export default connect<StateProps, {}, OwnProps, AppState>(({ ui }) => ({
  isFirstTimeVisit: ui.isFirstTimeVisit,
}))(AuthLoadingScreen);
