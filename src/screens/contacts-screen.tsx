// External imports
// React & React Native
import React, { useState } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { AppState } from '../state/types';
import { SPLASH_BG } from '../assets/app';
import { IMessage } from 'react-native-gifted-chat';
import ContactsHeader from '../components/contacts/contacts-header';
import {
  ContactList,
  ContactsBox,
  ContactScreenWrapper,
  ContactSearch,
  ImageBackgroundStyled,
} from '../components/contacts/contacts-styled';
import { RandomBackgrounds, TRANSPARENT_COLOR } from '../constants/colors';
import ValidatedTextField from '../components/shared/validated-text-field/validated-text-field';
import { DummyContactListType, DummyContactsList } from '../constants/dummy';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import ContactCard from '../components/chat-list/contact-card';
import { AppScreens } from '../navigation/screens';
import { Icon } from 'react-native-elements';

let backgroundIndex = 0;

const ContactsScreen: React.FunctionComponent<ContactsScreenProps> = ({
  navigation,
}) => {
  const [search, setSearchString] = useState('');

  const renderSettingItem = ({
    item,
    index,
  }: ListRenderItemInfo<DummyContactListType>) => {
    return (
      <View>
        <List.Item
          key={index}
          title={item.name}
          titleStyle={{ fontFamily: 'Roboto_500Medium', fontSize: 18 }}
          description={item.phoneNumber}
          descriptionStyle={{
            fontFamily: 'Roboto_400Regular',
            fontSize: 14,
            color: '#808080',
          }}
          descriptionNumberOfLines={2}
          left={() => {
            let additionalProps = {};
            if (!item.profilePicture) {
              const itemBg = RandomBackgrounds[backgroundIndex];
              backgroundIndex = backgroundIndex + 1;
              if (backgroundIndex >= RandomBackgrounds.length) {
                backgroundIndex = 0;
              }
              additionalProps = itemBg;
            }
            return (
              <View style={{ marginRight: 15 }}>
                <ContactCard
                  image={item.profilePicture}
                  name={item.name}
                  hideName
                  {...additionalProps}
                />
              </View>
            );
          }}
          right={() => (
            <View
              style={{
                marginLeft: 15,
                justifyContent: 'center',
              }}
            >
              <Icon name={'chevron-right'} type={'feather'} color={'#CFCFCF'} />
            </View>
          )}
          onPress={() => navigation.navigate(AppScreens.Chat)}
        />
        <Divider style={{ marginTop: 5, marginBottom: 10 }} />
      </View>
    );
  };

  return (
    <ContactScreenWrapper>
      <ImageBackgroundStyled source={SPLASH_BG} resizeMethod={'scale'} />
      <ContactsHeader navigation={navigation} />
      <ContactsBox>
        <ContactSearch>
          <ValidatedTextField
            name='search'
            value={search}
            onValueUpdated={(_s, t) => setSearchString(t)}
            placeholder={'Search Contact...'}
            placeholderTextColor={'#808080'}
            inputBackgroundColor={'#F2F2F2'}
            selectTextOnFocus
            selectionColor='rgba(0, 14, 96, 0.2)'
            borderColor={TRANSPARENT_COLOR}
            borderRadius={40}
            leftIcon={{
              name: 'search',
              type: 'feather',
              color: '#808080',
            }}
            errorMessage=''
          />
        </ContactSearch>
        <ContactList>
          <FlatList
            keyboardShouldPersistTaps='always'
            data={DummyContactsList}
            renderItem={renderSettingItem}
            horizontal={false}
            keyExtractor={(_item) => '' + Math.random()}
          />
        </ContactList>
      </ContactsBox>
    </ContactScreenWrapper>
  );
};

type OwnProps = NavigationScreenProps;

type StateProps = {
  messages: IMessage[];
};

type TransformerProps = {};

type ContactsScreenProps = OwnProps & StateProps & TransformerProps;

export default connect<{}, TransformerProps, OwnProps, AppState>(
  ({ messages }) => ({
    messages: messages.messages,
  }),
)(ContactsScreen);
