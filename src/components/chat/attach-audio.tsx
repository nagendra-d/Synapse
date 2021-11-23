import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import {
  AudioPlayerWrapper,
  BoxElement,
  RecordingIcon,
  RecordingText,
} from './chat-styled';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import LottieView from 'lottie-react-native';

const AttachAudio: React.FunctionComponent<AttachAudioProps> = ({
  onAudioSelected,
}) => {
  const [recording, setRecording] = useState<Audio.Recording>();
  const recordingSettings: Audio.RecordingOptions =
    Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY;
  const [hasRecordingPermissions, setHasRecordingPermissions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState<number>();
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    askForPermissions();
  }, []);

  const askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    await setHasRecordingPermissions(response.status === 'granted');
  };

  const updateScreenForRecordingStatus = (status: Audio.RecordingStatus) => {
    if (status.canRecord) {
      setIsRecording(status.isRecording);
      setRecordingDuration(status.durationMillis);
    } else if (status.isDoneRecording) {
      setIsRecording(false);
      setRecordingDuration(status.durationMillis);
      if (!isLoading) {
        stopRecordingAndEnablePlayback();
      }
    }
  };

  const stopPlaybackAndBeginRecording = async () => {
    setIsLoading(true);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });

    if (recording) {
      recording.setOnRecordingStatusUpdate(null);
      setRecording(undefined);
    }

    const record = new Audio.Recording();
    await record.prepareToRecordAsync(recordingSettings);
    record.setOnRecordingStatusUpdate(updateScreenForRecordingStatus);

    await setRecording(record);
    await record!.startAsync();
    setIsLoading(false);
  };

  const stopRecordingAndEnablePlayback = async () => {
    setIsLoading(true);
    if (!recording) {
      return;
    }
    try {
      await recording.stopAndUnloadAsync();
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
      setIsLoading(false);
      return;
    }
    const info = await FileSystem.getInfoAsync(recording.getURI() || '');
    onAudioSelected(info.uri);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    setIsLoading(false);
  };

  const onRecordPressed = async () => {
    if (isRecording) {
      stopRecordingAndEnablePlayback();
    } else {
      stopPlaybackAndBeginRecording();
    }
  };

  const getMMSSFromMillis = (millis: number) => {
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
  };

  const getRecordingTimestamp = () => {
    if (recordingDuration != null) {
      return `${getMMSSFromMillis(recordingDuration)}`;
    }
    return `${getMMSSFromMillis(0)}`;
  };

  return (
    <BoxElement
      onPress={onRecordPressed}
      accessibilityComponentType={'button'}
      disabled={!hasRecordingPermissions}
    >
      <AudioPlayerWrapper>
        {isRecording && (
          <RecordingIcon>
            <LottieView
              source={require('../../constants/record-icon.json')}
              autoPlay
              loop
            />
          </RecordingIcon>
        )}
        <Icon name='mic' type='feather' size={26} color={'#F6921E'} />
        {isRecording && (
          <RecordingText>{getRecordingTimestamp()}</RecordingText>
        )}
      </AudioPlayerWrapper>
    </BoxElement>
  );
};

type AttachAudioProps = {
  onAudioSelected: (uri: string) => void;
};

export default AttachAudio;
