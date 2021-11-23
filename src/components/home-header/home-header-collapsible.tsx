import React from 'react';
import styled from 'styled-components/native';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
// import { Icon } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { SPLASH_BG } from '../../assets/app';
import ContactCard from '../chat-list/contact-card';
import { DummyChatsList } from '../../constants/dummy';
import { RandomBackgrounds } from '../../constants/colors';
import { AppScreens } from '../../navigation/screens';

const CONTENT_BORDER_RADIUS = 0;
let backgroundIndex = 0;

export class HomeHeaderCollapsible extends React.Component<
  HomeHeaderProps,
  HomeHeaderStateProps
> {
  shouldComponentUpdate(): boolean {
    return false;
  }

  constructor(props: HomeHeaderProps) {
    super(props);
    this.state = {};
  }

  public componentDidMount() {}

  public render() {
    const { navigation } = this.props;
    return (
      <View style={[styles.Header]}>
        <ImageBackgroundStyled source={SPLASH_BG} resizeMethod={'scale'} />
        <AppHeaderContent>
          <UserContent horizontal={true} showsHorizontalScrollIndicator={false}>
            <ContactBox>
              <TouchableOpacity
                onPress={() => navigation.navigate(AppScreens.CreateContact)}
              >
                <ContactCard {...this.props} isAdd name={''} />
              </TouchableOpacity>
            </ContactBox>
            {DummyChatsList.map((d) => {
              let additionalProps = {};
              if (!d.profilePicture) {
                const item = RandomBackgrounds[backgroundIndex];
                backgroundIndex = backgroundIndex + 1;
                if (backgroundIndex >= RandomBackgrounds.length) {
                  backgroundIndex = 0;
                }
                additionalProps = item;
              }
              return (
                <ContactBox>
                  <ContactCard
                    image={d.profilePicture}
                    name={d.name}
                    {...additionalProps}
                  />
                </ContactBox>
              );
            })}
            <ContactBox>
              <ContactCard {...this.props} isMore name={'More'} />
            </ContactBox>
          </UserContent>
        </AppHeaderContent>
      </View>
    );
  }
}

type OwnProps = NavigationScreenProps;

type StateProps = {};

type TransformerProps = {};

type HomeHeaderStateProps = {};

type HomeHeaderProps = OwnProps & StateProps & TransformerProps;

export default HomeHeaderCollapsible;

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const ImageBackgroundStyled = styled.ImageBackground`
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${screenWidth}px;
  height: ${screenHeight}px;
`;

const AppHeaderContent = styled.View`
  flex-direction: column;
  justify-content: space-around;
  padding-left: 15px;
  padding-right: 15px;
  position: absolute;
  bottom: 100px;
  left: 0;
`;

const styles = StyleSheet.create({
  Header: {
    height: 350,
    borderBottomLeftRadius: CONTENT_BORDER_RADIUS,
    borderBottomRightRadius: CONTENT_BORDER_RADIUS,
  },
});

const UserContent = styled.ScrollView``;

const ContactBox = styled.View`
  margin-right: 15px;
`;
