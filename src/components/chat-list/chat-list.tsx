import React from 'react';
import { Text, View } from 'react-native';
import {
  DummyChatListType,
  DummyChatsList,
  DummyContactListType,
} from '../../constants/dummy';
import ContactCard from './contact-card';
import { Divider, List } from 'react-native-paper';
import moment from 'moment';
import { Badge } from 'react-native-elements';
import { RandomBackgrounds } from '../../constants/colors';
import { NavigationInjectedProps } from 'react-navigation';
import { AppScreens } from '../../navigation/screens';
import { UltimateListView } from 'react-native-ultimate-listview';

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%ss',
    s: 'now',
    ss: '%ds',
    m: '1min',
    mm: '%dmin',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    w: '1w',
    ww: '%dw',
    M: '1m',
    MM: '%dm',
    y: '1y',
    yy: '%dy',
  },
});
let backgroundIndex = 0;

const ChatList: React.FunctionComponent<OwnProps> = ({ navigation }) => {
  const renderSettingItem = (item: DummyChatListType, index: number) => {
    return (
      <View>
        <List.Item
          key={index}
          title={item.name}
          titleStyle={{ fontFamily: 'Roboto_500Medium', fontSize: 18 }}
          description={item.lastMessage}
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
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <Text>{moment(item.createdAt).fromNow(true)}</Text>
              {(item.badge && <Badge status='error' value={item.badge} />) ||
                null}
            </View>
          )}
          onPress={() => navigation.navigate(AppScreens.Chat)}
        />
        <Divider style={{ marginTop: 5, marginBottom: 10 }} />
      </View>
    );
  };

  const onFetch = async (
    _page: number = 1,
    startFetch: (rows: DummyChatListType[], pageLimit: number) => void,
    abortFetch: () => void,
  ) => {
    try {
      const pageLimit = 1000000;
      startFetch(DummyChatsList, pageLimit);
    } catch (e) {
      console.log('e', e);
      abortFetch();
    }
  };

  const keyExtractor = (_item: DummyContactListType, index: number) =>
    index.toString();

  return (
    <View style={{ paddingVertical: 30, paddingHorizontal: 15 }}>
      <UltimateListView
        firstLoader={true}
        onFetch={onFetch}
        keyExtractor={keyExtractor}
        item={renderSettingItem}
        autoPagination={false}
        onEndReachedThreshold={200}
      />
      {/*<FlatList
        keyboardShouldPersistTaps='always'
        data={DummyChatsList}
        renderItem={renderSettingItem}
        horizontal={false}
        keyExtractor={(_item) => '' + Math.random()}
      />*/}
    </View>
  );
};

type OwnProps = NavigationInjectedProps;

export default ChatList;
