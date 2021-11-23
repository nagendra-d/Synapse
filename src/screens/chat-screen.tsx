// External imports
// React & React Native
import React, { useCallback, useState } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { AppState } from '../state/types';
import { SPLASH_BG } from '../assets/app';
import { View } from 'react-native';
import {
  AvatarProps,
  BubbleProps,
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  Send,
  Time,
  TimeProps,
} from 'react-native-gifted-chat';
import { bindActionCreators } from 'redux';
import * as requests from '../state/requests';
import * as faker from 'faker';
import ChatHeader from '../components/chat/chat-header';
import { Icon } from 'react-native-elements';
import ChatBubble from '../components/chat/chat-bubble';
import ContactCard from '../components/chat-list/contact-card';
import { RandomBackgrounds } from '../constants/colors';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import {
  BottomMargin,
  BoxInnerWrapper,
  BoxWrapper,
  ChatActions,
  ChatBox,
  ChatScreenWrapper,
  deviceHeight,
  Header,
  ImageBackgroundStyled,
  PanelHandler,
  PanelHeader,
  styles,
  TouchableActionRipple,
  TouchableCloser,
} from '../components/chat/chat-styled';
import AttachImage from '../components/chat/attach-image';
import AttachDoc from '../components/chat/attach-doc';
import AttachLocation from '../components/chat/attach-location';
import AttachAudio from '../components/chat/attach-audio';
import { Location } from '../types/user';

const fromUser = 'first_user';
const fromUserName = faker.name.firstName();
const toUser = 'second_user';
const toUserName = faker.name.firstName();

const ChatScreen: React.FunctionComponent<ChatScreenProps> = ({
  messages,
  onMessageSend,
  onImageSend,
  onAudioSend,
  onLocationSend,
  onDocumentSend,
  navigation,
}) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const bs = React.createRef<BottomSheet>();
  const fall: Animated.Value<number> = new Animated.Value(0);

  const onSend = useCallback((messages = []) => {
    onMessageSend(messages, toUser, toUserName);
  }, []);

  const renderInputToolbar = (props: InputToolbarProps) => {
    return (
      <View style={{ height: 55, marginTop: 5 }}>
        <InputToolbar
          {...props}
          containerStyle={styles.inputToolbarContainerStyle}
        />
      </View>
    );
  };

  const renderCustomSend = (props: IMessage) => {
    return (
      <Send {...props} containerStyle={styles.sendBtnStyle}>
        <Icon name={'send'} type='feather' size={20} color={'#8E8E8E'} />
      </Send>
    );
  };

  const renderCustomActions = () => {
    return (
      <ChatActions>
        <TouchableActionRipple
          rippleColor='rgba(0, 0, 0, .2)'
          onPress={showBottomSheetCallBack}
        >
          <Icon name={'plus'} type='feather' size={20} color={'#FFF'} />
        </TouchableActionRipple>
      </ChatActions>
    );
  };

  const renderCustomBubble = (bubbleProps: BubbleProps<IMessage>) => {
    return (
      <ChatBubble
        {...bubbleProps}
        textStyle={{
          left: { color: '#000' },
          right: { color: '#000' },
        }}
      />
    );
  };

  const renderCustomTime = (props: TimeProps<IMessage>) => {
    return (
      <Time
        {...props}
        containerStyle={{
          left: { marginTop: 5 },
          right: { marginTop: 5 },
        }}
        timeTextStyle={{
          right: styles.timestampStyle,
          left: styles.timestampStyle,
        }}
      />
    );
  };

  const renderCustomAvatar = (props: AvatarProps<IMessage>) => {
    return (
      <ContactCard
        name={props.currentMessage!.user.name!}
        background={RandomBackgrounds[0].background}
        color={RandomBackgrounds[0].color}
      />
    );
  };

  const showBottomSheetCallBack = () => {
    if (bs.current) {
      bs.current.snapTo(1);
      bs.current.snapTo(1);
      setShowBottomSheet(true);
    }
  };

  const closeBottomSheet = () => {
    if (bs.current) {
      bs.current.snapTo(0);
      bs.current.snapTo(0);
      setShowBottomSheet(false);
    }
  };

  const onLocationSelect = (location: Location) => {
    closeBottomSheet();
    onLocationSend(fromUser, fromUserName, toUser, toUserName, location);
  };

  const onImageSelect = async () => {
    closeBottomSheet();
    await onImageSend(fromUser, fromUserName, toUser, toUserName);
  };

  const onDocumentSelected = async () => {
    closeBottomSheet();
    await onDocumentSend(
      fromUser,
      fromUserName,
      toUser,
      toUserName,
      'http://www.africau.edu/images/default/sample.pdf',
    );
  };

  const onAudioSelected = async (uri: string) => {
    closeBottomSheet();
    await onAudioSend(fromUser, fromUserName, toUser, toUserName, uri);
  };

  const renderHeader = () => (
    <Header>
      <PanelHeader>
        <PanelHandler />
      </PanelHeader>
    </Header>
  );

  const renderContent = () => {
    return (
      <BoxWrapper>
        <BoxInnerWrapper>
          <AttachImage onImageSelected={onImageSelect} />
          <AttachDoc onDocumentSelected={onDocumentSelected} />
        </BoxInnerWrapper>
        <BoxInnerWrapper>
          <AttachLocation onLocationSelect={onLocationSelect} />
          <AttachAudio onAudioSelected={onAudioSelected} />
        </BoxInnerWrapper>
      </BoxWrapper>
    );
  };

  return (
    <ChatScreenWrapper>
      <ImageBackgroundStyled source={SPLASH_BG} resizeMethod={'scale'} />
      <ChatHeader navigation={navigation} />
      <ChatBox>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: fromUser,
            name: fromUserName,
          }}
          placeholder={'Aa'}
          renderInputToolbar={renderInputToolbar}
          renderSend={renderCustomSend}
          renderActions={renderCustomActions}
          renderBubble={renderCustomBubble}
          renderTime={renderCustomTime}
          renderAvatar={renderCustomAvatar}
          minComposerHeight={50}
          maxComposerHeight={50}
          renderAvatarOnTop
          alwaysShowSend
        />
        <BottomMargin />
      </ChatBox>
      {showBottomSheet && (
        <TouchableCloser onPress={closeBottomSheet}>
          <View />
        </TouchableCloser>
      )}
      <BottomSheet
        ref={bs}
        snapPoints={[0, 0.93 * deviceHeight]}
        enabledInnerScrolling={false}
        enabledBottomInitialAnimation={true}
        renderContent={renderContent}
        renderHeader={renderHeader}
        callbackNode={fall}
        onCloseEnd={closeBottomSheet}
        initialSnap={0}
        enabledContentTapInteraction={false}
      />
    </ChatScreenWrapper>
  );
};

type OwnProps = NavigationScreenProps;

type StateProps = {
  messages: IMessage[];
};

type TransformerProps = {
  onMessageSend: typeof requests.message.onMessageSend;
  onImageSend: typeof requests.message.onImageSend;
  onAudioSend: typeof requests.message.onAudioSend;
  onLocationSend: typeof requests.message.onLocationSend;
  onDocumentSend: typeof requests.message.onDocumentSend;
};

type ChatScreenProps = OwnProps & StateProps & TransformerProps;

export default connect<{}, TransformerProps, OwnProps, AppState>(
  ({ messages }) => ({
    messages: messages.messages,
  }),
  (dispatch) => {
    return bindActionCreators(
      {
        onMessageSend: requests.message.onMessageSend,
        onImageSend: requests.message.onImageSend,
        onAudioSend: requests.message.onAudioSend,
        onLocationSend: requests.message.onLocationSend,
        onDocumentSend: requests.message.onDocumentSend,
      },
      dispatch,
    );
  },
)(ChatScreen);
