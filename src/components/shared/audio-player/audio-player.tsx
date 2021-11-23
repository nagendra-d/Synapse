import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import AudioSlider from './audio-slider';

const AudioPlayer: React.FunctionComponent<{ audio: string }> = ({ audio }) => {
  return (
    <View
      style={[
        styles.StandardContainer,
        {
          flex: 0,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          marginTop: 5,
          marginBottom: 5,
          width: 250,
        },
      ]}
    >
      <AudioSlider audio={{ uri: audio }} />
    </View>
  );
};

export default AudioPlayer;

const standardsStylesObject = {
  backgroundColor: 'white',
  borderColor: 'grey',
  color: 'black',
  borderRadius: 5,
  borderWidth: 0.5,
  fontSizeNormal: 17,
};

const styles = StyleSheet.create({
  StandardText: {
    fontSize: standardsStylesObject.fontSizeNormal,
    padding: 6,
    color: standardsStylesObject.color,
  },
  StandardContainer: {},
});
