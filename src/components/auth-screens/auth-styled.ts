import styled from 'styled-components/native';
import styledNative from 'styled-components-native';
import { Image } from 'react-native-elements';
import { TouchableRipple } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export const AuthWrapper = styled.View`
  flex: 1;
  justify-content: center;
  padding: 30px;
`;

export const AuthHeaderWrapper = styled.View`
  padding-left: 10px;
`;

export const StyledLogo = styledNative(Image)`
  .containerStyle {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
`;

export const AuthHeader = styled.Text`
  font-family: Roboto_500Medium;
  font-size: 24px;
`;

export const AuthForm = styled.View`
  padding: 100px 0 90px;
`;

export const PhoneAuthForm = styled.View`
  padding: 50px 0 20px;
`;

export const SignupAuthForm = styled.View`
  padding: 50px 0 20px;
`;

export const AuthFormInline = styled(AuthForm)`
  flex-direction: row;
  padding: 0;
`;

export const TouchableRippleStyled = styledNative(TouchableRipple)`
  .style {
    background-color: #0D122C;
    border-radius: 50px;
    padding: 17px 20px;
    align-items: center;
    margin: 20px 10px 0;
  }
`;

export const TouchableText = styled.Text`
  font-family: Roboto_500Medium;
  font-size: 18px;
  color: #fff;
`;

export const RulesWrapper = styled.View`
  padding: 10px 30px;
`;

export const RulesText = styled.Text<{ hasLink?: boolean }>`
  color: #808080;
  font-size: 12px;
  font-family: Roboto_400Regular;
  text-align: center;
  text-decoration: ${(props) => (props.hasLink ? 'underline' : 'none')};
`;

export const PhonesWrapper = styled.View`
  padding: 0 10px;
  margin-bottom: 60px;
`;

export const PhonesText = styled.Text<{ hasLink?: boolean }>`
  color: #808080;
  font-size: 12px;
  font-family: Roboto_400Regular;
  line-height: 24px;
  text-decoration: ${(props) => (props.hasLink ? 'underline' : 'none')};
`;

export const LoaderComponent = styled.View`
  background-color: #0d122c;
  border-radius: 50px;
  padding: 17px 20px;
  align-items: center;
  margin: 20px 10px 0;
  width: 60px;
  align-self: center;
`;

export const RulesFlexRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
`;

export const OTPInputs = StyleSheet.create({
  inputs: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 21,
    paddingTop: 0,
    paddingLeft: 5,
  },
});

export const FlexBox = styled.View<{ hasError?: boolean }>`
  height: ${(props) => (props.hasError ? 90 : 75)}px;
`;
