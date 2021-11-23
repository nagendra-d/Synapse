import { combineReducers } from 'redux';
import { AppState } from './types';
import userReducer from './user/user-reducers';
import uiReducer from './ui/ui-reducers';
import messagesReducer from './messages/messages-reducers';

export const rootReducer = combineReducers<AppState>({
  users: userReducer.reducer,
  ui: uiReducer.reducer,
  messages: messagesReducer.reducer,
});
