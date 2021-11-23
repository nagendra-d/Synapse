import React from 'react';
import { StyleSheet } from 'react-native';
import { Audio, AVPlaybackNativeSource, AVPlaybackStatus } from 'expo-av';
import { Icon, Slider } from 'react-native-elements';
import styled from 'styled-components/native';

export default class AudioSlider extends React.Component<
  AudioSliderProps,
  AudioSliderStateProps
> {
  private sound: Audio.Sound | null;
  private isSeeking: boolean;
  private shouldPlayAtEndOfSeek: boolean;

  constructor(props: AudioSliderProps) {
    super(props);
    this.sound = null;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.state = {
      isLoading: false,
      isPlaybackAllowed: false,
      soundPosition: null,
      soundDuration: null,
      shouldPlay: false,
      isPlaying: false,
      shouldCorrectPitch: true,
    };
  }

  componentDidMount() {
    this._stopRecordingAndEnablePlayback();
  }

  private _updateScreenForSoundStatus = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      this.setState({
        soundDuration: status.durationMillis || null,
        soundPosition: status.positionMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        shouldCorrectPitch: status.shouldCorrectPitch,
        isPlaybackAllowed: true,
      });
    } else {
      this.setState({
        soundDuration: null,
        soundPosition: null,
        isPlaybackAllowed: false,
      });
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  private async _stopRecordingAndEnablePlayback() {
    this.setState({
      isLoading: true,
    });

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    this.sound = new Audio.Sound();
    await this.sound.loadAsync(this.props.audio);
    this.sound.setOnPlaybackStatusUpdate(this._updateScreenForSoundStatus);
    this.setState({
      isLoading: false,
    });
  }

  private _onPlayPausePressed = () => {
    if (this.sound != null) {
      if (this.state.isPlaying) {
        this.sound.pauseAsync();
        this.setState({ isPlaying: false });
      } else {
        this.sound.playAsync();
        this.setState({ isPlaying: true });
      }
    }
  };

  private _onSeekSliderValueChange = (_value: number) => {
    if (this.sound != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.sound.pauseAsync();
    }
  };

  private _onSeekSliderSlidingComplete = async (value: number) => {
    if (this.sound != null) {
      this.isSeeking = false;
      const seekPosition = value * (this.state.soundDuration || 0);
      if (this.shouldPlayAtEndOfSeek) {
        this.sound.playFromPositionAsync(seekPosition);
      } else {
        this.sound.setPositionAsync(seekPosition);
      }
    }
  };

  private _getSeekSliderPosition() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return this.state.soundPosition / this.state.soundDuration;
    }
    return 0;
  }

  render() {
    return (
      <SliderWrapper>
        <SliderInner>
          <TouchableIcon
            onPress={this._onPlayPausePressed}
            disabled={!this.state.isPlaybackAllowed || this.state.isLoading}
          >
            <Icon
              name={this.state.isPlaying ? 'pause' : 'play-arrow'}
              type={'material'}
              color={'#FFF'}
              size={18}
            />
          </TouchableIcon>

          <TrackWrapper>
            <Slider
              style={styles.playbackSlider}
              value={this._getSeekSliderPosition()}
              onValueChange={this._onSeekSliderValueChange}
              onSlidingComplete={this._onSeekSliderSlidingComplete}
              allowTouchTrack
              thumbStyle={{
                height: 10,
                width: 10,
              }}
              thumbTintColor={'#FAAF40'}
              minimumTrackTintColor={'#FAAF40'}
              disabled={!this.state.isPlaybackAllowed || this.state.isLoading}
            />
          </TrackWrapper>
        </SliderInner>
      </SliderWrapper>
    );
  }
}

type AudioSliderProps = {
  audio: AVPlaybackNativeSource;
};

type AudioSliderStateProps = {
  isLoading: boolean;
  isPlaybackAllowed: boolean;
  soundPosition: number | null;
  soundDuration: number | null;
  shouldPlay: boolean;
  isPlaying: boolean;
  shouldCorrectPitch: boolean;
};

const styles = StyleSheet.create({
  playbackSlider: {
    alignSelf: 'stretch',
  },
});

const SliderWrapper = styled.View`
  flex: 0;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;

const SliderInner = styled.View`
  flex: 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
`;

const TouchableIcon = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  z-index: 2;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: #faaf40;
`;

const TrackWrapper = styled.View`
  flex: 8;
  padding-left: 15px;
`;
