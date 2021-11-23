// External imports
// React & React Native
import React from 'react';
import { BubbleProps, IMessage } from 'react-native-gifted-chat';
// Relative imports
// Components
import InheritedBubble from './inherited-bubble';

const ChatBubble: React.FunctionComponent<ChatBubbleProps> = (props) => {
  return <InheritedBubble {...props} />;
};

type ChatBubbleProps = BubbleProps<IMessage> & {};

export default ChatBubble;
