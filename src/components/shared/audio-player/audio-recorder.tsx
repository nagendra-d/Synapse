import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import { Icon } from 'react-native-elements';

type Props = {};

type State = {
  haveRecordingPermissions: boolean;
  isLoading: boolean;
  recordingDuration: number | null;
  isRecording: boolean;
  shouldCorrectPitch: boolean;
};

export default class AudioRecorder extends React.Component<Props, State> {
  private recording: Audio.Recording | null;
  private readonly recordingSettings: Audio.RecordingOptions;

  constructor(props: Props) {
    super(props);
    this.recording = null;
    this.state = {
      haveRecordingPermissions: false,
      isLoading: false,
      recordingDuration: null,
      isRecording: false,
      shouldCorrectPitch: true,
    };
    this.recordingSettings = Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY;

    // UNCOMMENT THIS TO TEST maxFileSize:
    /* this.recordingSettings = {
      ...this.recordingSettings,
      android: {
        ...this.recordingSettings.android,
        maxFileSize: 12000,
      },
    };*/
  }

  componentDidMount() {
    this._askForPermissions();
  }

  private _askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
      haveRecordingPermissions: response.status === 'granted',
    });
  };

  private _updateScreenForRecordingStatus = (status: Audio.RecordingStatus) => {
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
      if (!this.state.isLoading) {
        this._stopRecordingAndEnablePlayback();
      }
    }
  };

  private async _stopPlaybackAndBeginRecording() {
    this.setState({
      isLoading: true,
    });
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    if (this.recording !== null) {
      this.recording.setOnRecordingStatusUpdate(null);
      this.recording = null;
    }

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(this.recordingSettings);
    recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

    this.recording = recording;
    await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
    this.setState({
      isLoading: false,
    });
  }

  private async _stopRecordingAndEnablePlayback() {
    this.setState({
      isLoading: true,
    });
    if (!this.recording) {
      return;
    }
    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      // On Android, calling stop before any data has been collected results in
      // an E_AUDIO_NODATA error. This means no audio data has been written to
      // the output file is invalid.
      if (error.code === 'E_AUDIO_NODATA') {
        console.log(
          `Stop was called too quickly, no data has yet been received (${error.message})`,
        );
      } else {
        console.log('STOP ERROR: ', error.code, error.name, error.message);
      }
      this.setState({
        isLoading: false,
      });
      return;
    }
    // const info = await FileSystem.getInfoAsync(this.recording.getURI() || '');

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    this.setState({
      isLoading: false,
    });
  }

  private _onRecordPressed = () => {
    if (this.state.isRecording) {
      this._stopRecordingAndEnablePlayback();
    } else {
      this._stopPlaybackAndBeginRecording();
    }
  };

  private _getMMSSFromMillis(millis: number) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (number: number) => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  }

  private _getRecordingTimestamp() {
    if (this.state.recordingDuration != null) {
      return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
    }
    return `${this._getMMSSFromMillis(0)}`;
  }

  render() {
    if (!this.state.haveRecordingPermissions) {
      return (
        <View style={styles.container}>
          <View />
          <Text
            style={[
              styles.noPermissionsText,
              { fontFamily: 'cutive-mono-regular' },
            ]}
          >
            You must enable audio recording permissions in order to use this
            app.
          </Text>
          <View />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={[styles.halfScreenContainer]}>
          <View />
          <View style={styles.recordingContainer}>
            <View />
            <TouchableHighlight
              style={styles.wrapper}
              onPress={this._onRecordPressed}
              disabled={this.state.isLoading}
            >
              <Icon name={'mic'} type={'feather'} />
            </TouchableHighlight>
            <View style={styles.recordingDataContainer}>
              <View />
              <Text
                style={[styles.liveText, { fontFamily: 'cutive-mono-regular' }]}
              >
                {this.state.isRecording ? 'LIVE' : ''}
              </Text>
              <View style={styles.recordingDataRowContainer}>
                <Text
                  style={[
                    styles.recordingTimestamp,
                    { fontFamily: 'cutive-mono-regular' },
                  ]}
                >
                  {this._getRecordingTimestamp()}
                </Text>
              </View>
              <View />
            </View>
            <View />
          </View>
          <View />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    alignSelf: 'stretch',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  noPermissionsText: {
    textAlign: 'center',
  },
  wrapper: {},
  halfScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  recordingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  recordingDataContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordingDataRowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playbackContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  playbackSlider: {
    alignSelf: 'stretch',
  },
  liveText: {},
  recordingTimestamp: {
    paddingLeft: 20,
  },
  playbackTimestamp: {
    textAlign: 'right',
    alignSelf: 'stretch',
    paddingRight: 20,
  },
  image: {},
  textButton: {
    padding: 10,
  },
  buttonsContainerBase: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonsContainerTopRow: {
    alignSelf: 'stretch',
    paddingRight: 20,
  },
  playStopContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  volumeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  volumeSlider: {},
  buttonsContainerBottomRow: {
    alignSelf: 'stretch',
    paddingRight: 20,
    paddingLeft: 20,
  },
  timestamp: {
    fontFamily: 'cutive-mono-regular',
  },
  rateSlider: {},
});
