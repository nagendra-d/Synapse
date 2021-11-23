// External imports
// React & React Native
import React from 'react';
import styled from 'styled-components/native';
import { NavigationScreenProps } from 'react-navigation';
import HomeHeaderCollapsible from '../components/home-header/home-header-collapsible';
import { Icon } from 'react-native-elements';
import {
  Image,
  NativeSyntheticEvent,
  Platform,
  ScrollViewProps,
  View,
} from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import CollapsibleToolbar from '../components/shared/react-native-collapsible-toolbar/react-native-collapsible-toolbar';
import ChatList from '../components/chat-list/chat-list';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { AppScreens } from '../navigation/screens';
import { HAMBURGER } from '../assets/app';

const HEADER_MAXIMUM_HEIGHT = 350;

const BAR_SIZE = Platform.select({
  android: 10,
  default: 10,
});

export class HomeCollapsibleScreen extends React.Component<
  HomeScreenProps,
  HomeScreenStateProps
> {
  shouldComponentUpdate(): boolean {
    return false;
  }

  constructor(props: HomeScreenProps) {
    super(props);
    this.state = {
      scrollPosition: 0,
    };
  }

  public componentDidMount(): void {}

  private onContentScroll = (e: NativeSyntheticEvent<ScrollViewProps>) => {
    const position = e.nativeEvent.contentOffset!.y || 0;
    this.setState({ scrollPosition: position });
  };

  private renderContent = () => {
    return (
      <View
        style={{
          backgroundColor: '#FFF',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          marginTop: -50,
        }}
      >
        <ChatList {...this.props} />
      </View>
    );
  };

  private renderToolBar = () => {
    return <HomeHeaderCollapsible {...this.props} />;
  };

  private renderNavBar = () => {
    const { navigation } = this.props;
    const { scrollPosition } = this.state;
    return (
      <AppHeader scrollPosition={scrollPosition}>
        <View style={{ flex: 1 }}>
          <TouchableRipple
            style={{ paddingLeft: 5 }}
            onPress={navigation.openDrawer}
            rippleColor='#FFF'
          >
            <Image
              source={HAMBURGER}
              width={24}
              height={17}
              resizeMethod={'resize'}
            />
          </TouchableRipple>
        </View>
        <View style={{ flex: 5 }}>
          <WelcomeMessage>Synapse</WelcomeMessage>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableRipple
            onPress={() => navigation.navigate(AppScreens.Home)}
            rippleColor='#FFF'
          >
            <View>
              <Icon
                name='bell'
                type='feather'
                color='#FFF'
                size={25}
                underlayColor='rgba(0,0,0,0)'
              />
            </View>
          </TouchableRipple>
        </View>
      </AppHeader>
    );
  };

  public render() {
    return (
      <HomeScreenWrapper>
        <CollapsibleToolbar
          collapsedNavBarBackgroundColor={'#A60852'}
          renderContent={this.renderContent}
          renderNavBar={this.renderNavBar}
          renderToolBar={this.renderToolBar}
          toolBarHeight={HEADER_MAXIMUM_HEIGHT}
          translucentStatusBar={false}
          onContentScroll={this.onContentScroll}
        />
      </HomeScreenWrapper>
    );
  }
}

type OwnProps = NavigationScreenProps;

type StateProps = {};

type TransformerProps = {};

type HomeScreenProps = OwnProps & StateProps & TransformerProps;

type HomeScreenStateProps = {
  scrollPosition: number;
};

export default HomeCollapsibleScreen;

const HomeScreenWrapper = styled.View`
  flex: 1;
  background-color: #f7f8fd;
`;

const AppHeader = styled.View<{ scrollPosition: number }>`
  background: ${(props) =>
    props.scrollPosition > 15 ? '#A60852' : 'rgba(0, 0, 0, 0)'};
  justify-content: space-between;
  align-items: center;
  align-content: center;
  flex-direction: row;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-top: ${BAR_SIZE + getStatusBarHeight()}px;
  flex: 1;
`;

const WelcomeMessage = styled.Text`
  color: #fff;
  font-size: 24px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
`;
