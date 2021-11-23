// External imports
// React & React Native
import React from 'react';
import {
  Linking,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { Bubble, IMessage } from 'react-native-gifted-chat';
import styled, { css } from 'styled-components/native';
// Misc
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AudioPlayer from '../shared/audio-player/audio-player';
import { Location } from '../../types/user';
import { Icon } from 'react-native-elements';
import openMap from 'react-native-open-maps';

// Relative imports

export default class InheritedBubble extends Bubble<
  IMessage & { location?: Location; uri?: string }
> {
  private renderStatusIcon() {
    const { currentMessage } = this.props;
    if (!currentMessage) {
      return;
    }

    return <MaterialCommunityIcons name='check' size={12} />;
  }

  private renderAudio = () => {
    const { currentMessage } = this.props;
    return <AudioPlayer audio={currentMessage!.audio!} />;
  };

  private renderUrl = () => {
    const { currentMessage } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(currentMessage!.uri!);
        }}
      >
        <Icon name={'link'} type={'feather'} color={'#F6921E'} />
      </TouchableOpacity>
    );
  };

  private renderLocation = () => {
    const { currentMessage } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          openMap({
            navigate_mode: 'preview',
            end: `${currentMessage!.location!.latitude!},${currentMessage!
              .location!.longitude!}`,
          });
        }}
      >
        <Icon name={'map'} type={'feather'} color={'#F6921E'} />
      </TouchableOpacity>
    );
  };

  public render() {
    const {
      position,
      children,
      bottomContainerStyle,
      wrapperStyle,
      touchableProps,
      currentMessage,
    } = this.props;
    const isLocal = position === 'right';
    const isAudio = !!currentMessage!.audio;
    const isLocation = !!currentMessage!.location;
    const isUrl = !!currentMessage!.uri;
    return (
      <Container bubblePosition={position}>
        <Wrapper
          bubblePosition={position}
          style={
            [
              wrapperStyle![position!],
              this.styledBubbleToNext(),
              this.styledBubbleToPrevious(),
            ] as ViewStyle
          }
        >
          <TouchableWithoutFeedback
            onLongPress={this.onLongPress}
            accessibilityTraits='text'
            {...touchableProps}
          >
            <View>
              {this.renderCustomView()}
              <BubbleWrapper bubblePosition={position}>
                {this.renderMessageImage()}
                {this.renderMessageText()}
                {isAudio ? this.renderAudio() : null}
                {isLocation ? this.renderLocation() : null}
                {isUrl ? this.renderUrl() : null}
              </BubbleWrapper>
              <Footer
                bubblePosition={position}
                style={[bottomContainerStyle![position!] as ViewStyle]}
              >
                {this.renderTicks()}
                {this.renderTime()}
                {isLocal && (
                  <IconContainer>{this.renderStatusIcon()}</IconContainer>
                )}
              </Footer>
            </View>
          </TouchableWithoutFeedback>
          {children}
        </Wrapper>
      </Container>
    );
  }
}

const Container = styled.View<BubbleStyleProps>`
  flex: 1;
  ${(props) =>
    props.bubblePosition === 'left' &&
    css`
      align-items: flex-start;
      padding-left: 10px;
    `}
  ${(props) =>
    props.bubblePosition === 'right' &&
    css`
      align-items: flex-end;
    `}
`;

const Wrapper = styled.View<BubbleStyleProps>`
  border-radius: 25px;
  min-width: 90px;
  min-height: 20px;
  justify-content: center;
  ${(props) =>
    props.bubblePosition === 'left' &&
    css`
      margin-right: 60px;
      padding: 0 7px 3px 0;
      border-top-left-radius: 3px;
    `}
  ${(props) =>
    props.bubblePosition === 'right' &&
    !props.isError &&
    css`
      margin-left: 60px;
      padding: 0 7px 3px;
      border-top-right-radius: 3px;
    `}
  ${(props) =>
    props.bubblePosition === 'right' &&
    props.isError &&
    css`
      margin-left: 60px;
    `}
`;

const IconContainer = styled.View`
  width: 12px;
  height: 12px;
  margin-right: 5px;
  margin-bottom: 5px;
`;

export const Footer = styled.View<BubbleStyleProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${(props) =>
    props.bubblePosition === 'left' &&
    css`
      justify-content: flex-end;
    `}
  ${(props) =>
    props.bubblePosition === 'right' &&
    css`
      justify-content: flex-end;
    `}
`;

const BubbleWrapper = styled.View<{ bubblePosition: string }>`
  background: ${(props) =>
    props.bubblePosition === 'left' ? '#F3F3F3' : '#FFE7C4'};
  padding: 10px;
  border-radius: 15px;
  ${(props) =>
    props.bubblePosition === 'left' &&
    css`
      border-bottom-left-radius: 0;
    `}
  ${(props) =>
    props.bubblePosition === 'right' &&
    css`
      border-bottom-right-radius: 0;
    `}
`;

type BubbleStyleProps = {
  bubblePosition: 'left' | 'right' | undefined;
  isError?: boolean;
};
