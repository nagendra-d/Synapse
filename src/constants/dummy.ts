import moment from 'moment';
import { AVATAR_1, AVATAR_2, AVATAR_3 } from '../assets/dummy';
import { ImageSourcePropType } from 'react-native';
import { IMessage } from 'react-native-gifted-chat';
import uuid from 'uuid';

export type DummyChatListType = {
  name: string;
  lastMessage: string;
  createdAt: Date;
  badge?: number;
  profilePicture?: ImageSourcePropType;
};

export type DummyContactListType = {
  id: string;
  name: string;
  phoneNumber: number;
  profilePicture?: ImageSourcePropType;
};

export const DummyChatsList: DummyChatListType[] = [
  {
    name: 'Karthikeyan',
    lastMessage:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing, consectetuer adipiscing',
    createdAt: moment().subtract(5, 'minutes').toDate(),
    badge: 4,
    profilePicture: AVATAR_1,
  },
  {
    name: 'Ramakrishna',
    lastMessage:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing, consectetuer adipiscing',
    createdAt: moment().subtract(15, 'minutes').toDate(),
    badge: 10,
  },
  {
    name: 'Anirudh',
    lastMessage:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing, consectetuer adipiscing',
    createdAt: moment().subtract(4, 'hour').toDate(),
    profilePicture: AVATAR_3,
  },
  {
    name: 'Mahalaxmi',
    lastMessage:
      'Lorem ipsum   dolor sit amet, consectetuer adipiscing, consectetuer adipiscing',
    createdAt: moment().subtract(1, 'day').toDate(),
    badge: 4,
  },
  {
    name: 'Test user 2',
    lastMessage:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing, consectetuer adipiscing',
    createdAt: moment().subtract(1, 'week').toDate(),
    badge: 4,
    profilePicture: AVATAR_2,
  },
  {
    name: 'Karthikeyan',
    lastMessage:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing, consectetuer adipiscing',
    createdAt: moment().subtract(1, 'month').toDate(),
    badge: 4,
    profilePicture: AVATAR_1,
  },
  {
    name: 'Karthikeyan',
    lastMessage:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing, consectetuer adipiscing',
    createdAt: moment().subtract(5, 'year').toDate(),
    badge: 4,
    profilePicture: AVATAR_1,
  },
  {
    name: 'Karthikeyan',
    lastMessage:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing, consectetuer adipiscing',
    createdAt: moment().subtract(5, 'year').toDate(),
    badge: 4,
    profilePicture: AVATAR_1,
  },
  {
    name: 'Karthikeyan',
    lastMessage:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing, consectetuer adipiscing',
    createdAt: moment().subtract(5, 'year').toDate(),
    badge: 4,
    profilePicture: AVATAR_1,
  },
  {
    name: 'Karthikeyan',
    lastMessage:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing, consectetuer adipiscing',
    createdAt: moment().subtract(5, 'year').toDate(),
    badge: 4,
    profilePicture: AVATAR_1,
  },
  {
    name: 'Karthikeyan',
    lastMessage:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing, consectetuer adipiscing',
    createdAt: moment().subtract(5, 'year').toDate(),
    badge: 4,
    profilePicture: AVATAR_1,
  },
  {
    name: 'Karthikeyan',
    lastMessage:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing, consectetuer adipiscing',
    createdAt: moment().subtract(5, 'year').toDate(),
    badge: 4,
    profilePicture: AVATAR_1,
  },
];

export const GiftedMessages: IMessage[] = [
  {
    _id: uuid.v4(),
    text: 'Hello',
    createdAt: moment().toDate(),
    user: {
      _id: 'first_user',
      name: 'First User',
    },
  },
  {
    _id: uuid.v4(),
    text: 'Hello',
    createdAt: moment().toDate(),
    user: {
      _id: 'second_user',
      name: 'Second User',
    },
  },
];

export const DummyContactsList: DummyContactListType[] = [
  {
    id: uuid.v4(),
    phoneNumber: 1234567890,
    name: 'Karthikeyan',
    profilePicture: AVATAR_1,
  },
  {
    id: uuid.v4(),
    phoneNumber: 98765432123,
    name: 'Ramakrishna',
  },
  {
    id: uuid.v4(),
    phoneNumber: 4567890876,
    name: 'Anirudh',
    profilePicture: AVATAR_3,
  },
  {
    id: uuid.v4(),
    phoneNumber: 39208475357,
    name: 'Mahalaxmi',
  },
  {
    id: uuid.v4(),
    phoneNumber: 32863947967,
    name: 'Test user 2',
    profilePicture: AVATAR_2,
  },
  {
    id: uuid.v4(),
    phoneNumber: 39479665547,
    name: 'Karthikeyan',
    profilePicture: AVATAR_1,
  },
  {
    id: uuid.v4(),
    phoneNumber: 392756453908,
    name: 'Karthikeyan',
    profilePicture: AVATAR_1,
  },
  {
    id: uuid.v4(),
    phoneNumber: 56908735664,
    name: 'Karthikeyan',
    profilePicture: AVATAR_1,
  },
  {
    id: uuid.v4(),
    phoneNumber: 973648937645,
    name: 'Karthikeyan',
    profilePicture: AVATAR_1,
  },
  {
    id: uuid.v4(),
    phoneNumber: 63248328947,
    name: 'Karthikeyan',
    profilePicture: AVATAR_1,
  },
  {
    id: uuid.v4(),
    phoneNumber: 423490827424,
    name: 'Karthikeyan',
    profilePicture: AVATAR_1,
  },
  {
    id: uuid.v4(),
    phoneNumber: 327860129345,
    name: 'Karthikeyan',
    profilePicture: AVATAR_1,
  },
];

export const SUPPORTED_FILES = [
  'pdf',
  'ppt',
  'pptx',
  'xls',
  'xlsx',
  'doc',
  'docx',
];
