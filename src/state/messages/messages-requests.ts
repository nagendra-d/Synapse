import messagesReducer from './messages-reducers';
import { Dispatch } from 'redux';
import * as faker from 'faker';
import uuid from 'uuid';
import moment from 'moment';
import { IMessage } from 'react-native-gifted-chat';
import { Location } from '../../types/user';

export const onMessageSend = (
  messages: IMessage[],
  toUser: string,
  toUserName: string,
) => async (dispatch: Dispatch) => {
  /*dispatch({
    type: PURGE,
    key: 'synapse',
  });*/

  messages.map((m) => {
    m.createdAt = moment(m.createdAt).toDate().getTime();
  });
  await dispatch(messagesReducer.actions.onMessageSend({ messages }));
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await dispatch(
    messagesReducer.actions.onMessageSend({
      messages: [
        {
          _id: uuid.v4(),
          createdAt: moment().toISOString(),
          text: faker.commerce.productDescription(),
          user: {
            _id: toUser,
            name: toUserName,
          },
        },
      ],
    }),
  );
};

export const onImageSend = (
  fromUser: string,
  fromUserName: string,
  toUser: string,
  toUserName: string,
) => async (dispatch: Dispatch) => {
  await dispatch(
    messagesReducer.actions.onMessageSend({
      messages: [
        {
          _id: uuid.v4(),
          createdAt: moment().toISOString(),
          image: faker.image.image(),
          user: {
            _id: fromUser,
            name: fromUserName,
          },
        },
      ],
    }),
  );
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await dispatch(
    messagesReducer.actions.onMessageSend({
      messages: [
        {
          _id: uuid.v4(),
          createdAt: moment().toISOString(),
          text: faker.commerce.productDescription(),
          user: {
            _id: toUser,
            name: toUserName,
          },
        },
      ],
    }),
  );
};

export const onAudioSend = (
  fromUser: string,
  fromUserName: string,
  toUser: string,
  toUserName: string,
  uri: string,
) => async (dispatch: Dispatch) => {
  await dispatch(
    messagesReducer.actions.onMessageSend({
      messages: [
        {
          _id: uuid.v4(),
          createdAt: moment().toISOString(),
          audio: uri,
          user: {
            _id: fromUser,
            name: fromUserName,
          },
        },
      ],
    }),
  );
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await dispatch(
    messagesReducer.actions.onMessageSend({
      messages: [
        {
          _id: uuid.v4(),
          createdAt: moment().toISOString(),
          audio:
            'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_2MG.mp3',
          user: {
            _id: toUser,
            name: toUserName,
          },
        },
      ],
    }),
  );
};

export const onLocationSend = (
  fromUser: string,
  fromUserName: string,
  toUser: string,
  toUserName: string,
  location: Location,
) => async (dispatch: Dispatch) => {
  await dispatch(
    messagesReducer.actions.onMessageSend({
      messages: [
        {
          _id: uuid.v4(),
          createdAt: moment().toISOString(),
          location,
          user: {
            _id: fromUser,
            name: fromUserName,
          },
        },
      ],
    }),
  );
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await dispatch(
    messagesReducer.actions.onMessageSend({
      messages: [
        {
          _id: uuid.v4(),
          createdAt: moment().toISOString(),
          text: faker.commerce.productDescription(),
          user: {
            _id: toUser,
            name: toUserName,
          },
        },
      ],
    }),
  );
};

export const onDocumentSend = (
  fromUser: string,
  fromUserName: string,
  toUser: string,
  toUserName: string,
  uri: string,
) => async (dispatch: Dispatch) => {
  await dispatch(
    messagesReducer.actions.onMessageSend({
      messages: [
        {
          _id: uuid.v4(),
          createdAt: moment().toISOString(),
          uri,
          user: {
            _id: fromUser,
            name: fromUserName,
          },
        },
      ],
    }),
  );
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await dispatch(
    messagesReducer.actions.onMessageSend({
      messages: [
        {
          _id: uuid.v4(),
          createdAt: moment().toISOString(),
          text: faker.commerce.productDescription(),
          user: {
            _id: toUser,
            name: toUserName,
          },
        },
      ],
    }),
  );
};
