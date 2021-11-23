import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import styledNative from 'styled-components-native';
import { TouchableRipple } from 'react-native-paper';

export const boxWidth = 100;
export const deviceHeight = boxWidth * 2 + 200;

export const styles = StyleSheet.create({
  customComposerStyle: {
    borderWidth: 2,
    borderRadius: 25,
    marginLeft: 0,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 12,
    lineHeight: 18,
  },
  sendBtnStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
  },
  inputToolbarContainerStyle: {
    backgroundColor: '#EEE',
    borderRadius: 50,
    borderTopWidth: 0,
    paddingLeft: 15,
    paddingRight: 10,
    marginHorizontal: 30,
  },
  systemMessageContainerStyle: {
    alignItems: 'center',
    marginTop: 0,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15,
  },
  timestampStyle: {
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
    color: '#868686',
  },
  dateStyle: {
    marginTop: 10,
    marginBottom: 5,

    fontSize: 14,
  },
  listStyle: {
    flex: 1,
    paddingRight: 70,
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});

export const screenWidth = Dimensions.get('screen').width;
export const screenHeight = Dimensions.get('screen').height;

export const ChatScreenWrapper = styled.View`
  flex: 1;
`;

export const ImageBackgroundStyled = styled.ImageBackground`
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${screenWidth}px;
  height: ${screenHeight}px;
`;

export const ChatBox = styled.View`
  background: #fff;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding-top: 30px;
  flex: 1;
  margin-top: 50px;
`;

export const BottomMargin = styled.View`
  margin-bottom: 40px;
`;

export const ChatActions = styled.View`
  align-self: center;
  margin-right: 5px;
`;

export const TouchableActionRipple = styledNative(TouchableRipple)`
  .style {
    height: 26px;
    width: 26px;
    border-radius: 13px;
    align-items: center;
    justify-content: center;
    background-color: #FAAF40;
  }
`;

export const Header = styled.View`
  z-index: 999;
`;

export const PanelHandler = styled.View`
  width: 40px;
  height: 4px;
  border-radius: 4px;
  background-color: #00000040;
`;

export const PanelHeader = styled.View`
  margin-top: 10px;
  align-items: center;
  background-color: #ffffff;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

export const TouchableCloser = styledNative(TouchableRipple)`
  .style {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export const BoxWrapper = styled.View`
  height: ${deviceHeight}px;
  background-color: #fff;
  padding-bottom: 120px;
  padding-top: 20px;
  align-items: center;
`;

export const BoxInnerWrapper = styled.View`
  width: ${boxWidth * 2 + 100}px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;

export const BoxElement = styledNative(TouchableRipple)`
  .style {
    width: ${boxWidth}px;
    height: ${boxWidth}px;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 25px;
    background: #f3f3f3;
    align-items: center;
    justify-content: center;
  }
`;

export const RecordingText = styled.Text`
  font-size: 12px;
  color: #f6921e;
  position: absolute;
  bottom: 10px;
`;

export const RecordingIcon = styled.View`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 18px;
  height: 18px;
`;

export const AudioPlayerWrapper = styled.View`
  width: ${boxWidth}px;
  height: ${boxWidth}px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
`;
