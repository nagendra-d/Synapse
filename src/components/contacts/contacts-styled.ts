import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const screenWidth = Dimensions.get('screen').width;
export const screenHeight = Dimensions.get('screen').height;

export const ContactsBox = styled.View`
  background: #fff;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding-top: 30px;
  flex: 1;
  margin-top: 50px;
`;

export const ContactScreenWrapper = styled.View`
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

export const ContactSearch = styled.View`
  height: 60px;
  padding-left: 15px;
  padding-right: 15px;
`;

export const ContactList = styled.View`
  padding: 30px 15px 60px 15px;
`;
