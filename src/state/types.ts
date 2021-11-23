import { UserTypes } from './user/user-types';
import { UiTypes } from './ui/ui-types';
import { MessagesTypes } from './messages/messages-types';

export type AppState = {
  users: UserTypes;
  ui: UiTypes;
  messages: MessagesTypes;
};
