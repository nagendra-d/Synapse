import {
  createSlice,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit';

import { MessagesTypes } from './messages-types';
import { initialState } from './messages-initial-state';

const reducers: ValidateSliceCaseReducers<
  MessagesTypes,
  SliceCaseReducers<MessagesTypes>
> = {
  onMessageSend: (state, action) => {
    state.messages = [...action.payload.messages, ...(state.messages || [])];
  },
};

const messagesReducer = createSlice({
  name: 'messages',
  initialState,
  reducers,
});

export default messagesReducer;
