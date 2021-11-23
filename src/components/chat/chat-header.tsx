// External imports
// React & React Native
import React from 'react';
import styled from 'styled-components/native';
import { NavigationScreenProps } from 'react-navigation';
import { Badge, Icon } from 'react-native-elements';
import ContactCard from '../chat-list/contact-card';
import { AVATAR_1 } from '../../assets/dummy';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styledNative from 'styled-components-native';
import { Platform } from 'react-native';

const BAR_SIZE = Platform.select({
  android: 30,
  ios: 30,
  default: 10,
});

const ChatHeader: React.FunctionComponent<ChatHeaderProps> = ({
  navigation,
}) => {
  return (
    <ChatScreenHeader>
      <Icon
        name='arrow-left'
        type='feather'
        color='#FFF'
        size={30}
        onPress={() => navigation.goBack()}
      />
      <ChatTitle>
        <ContactCard
          image={AVATAR_1}
          name=''
          width={50}
          height={50}
          radius={15}
          size={20}
          hideName
        />
        <ChatTitleWrapper>
          <ChatTitleText>Karthikeyan</ChatTitleText>
          <ChatBadge>
            <ChatBadgeDot status='success' />
            <ChatBadgeText>Online</ChatBadgeText>
          </ChatBadge>
        </ChatTitleWrapper>
      </ChatTitle>
    </ChatScreenHeader>
  );
};

type OwnProps = NavigationScreenProps;

type ChatHeaderProps = OwnProps;

export default ChatHeader;

const ChatScreenHeader = styled.View`
  padding-left: 15px;
  padding-right: 15px;
  padding-top: ${BAR_SIZE + getStatusBarHeight()}px;
  flex-direction: row;
  align-items: center;
`;

const ChatTitle = styled.View`
  margin-left: 30px;
  flex-direction: row;
  align-items: center;
`;

const ChatTitleText = styled.Text`
  color: #fff;
  font-family: Roboto_400Regular;
  font-size: 18px;
`;

const ChatTitleWrapper = styled.View`
  margin-left: 15px;
`;

const ChatBadge = styled.View`
  margin-top: 5px;
  flex-direction: row;
  align-items: center;
`;

const ChatBadgeDot = styledNative(Badge)`
  .style {
    margin-top: 3px;
    flex-direction: row;
    align-items: center;
  }
  .badgeStyle {
    width: 10px;
    height: 10px;
    border-radius: 5px;
  }
`;

const ChatBadgeText = styled.Text`
  font-family: Roboto_400Regular;
  font-size: 13px;
  margin-left: 5px;
  color: #fff;
`;
