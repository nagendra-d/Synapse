// External imports
// React & React Native
import React from 'react';
import styled from 'styled-components/native';
import { NavigationScreenProps } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Platform } from 'react-native';

const BAR_SIZE = Platform.select({
  android: 30,
  ios: 30,
  default: 10,
});

const ContactsHeader: React.FunctionComponent<ContactsHeaderProps> = ({
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
        <ChatTitleWrapper>
          <ChatTitleText>Select Contact</ChatTitleText>
        </ChatTitleWrapper>
      </ChatTitle>
      <Icon
        name='plus'
        type='feather'
        color='#FFF'
        size={30}
        onPress={() => navigation.goBack()}
      />
    </ChatScreenHeader>
  );
};

type OwnProps = NavigationScreenProps;

type ContactsHeaderProps = OwnProps;

export default ContactsHeader;

const ChatScreenHeader = styled.View`
  padding-left: 15px;
  padding-right: 15px;
  padding-top: ${BAR_SIZE + getStatusBarHeight()}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ChatTitle = styled.View`
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
