import React, { useState } from 'react';
import { NavigationFocusInjectedProps } from 'react-navigation';
import { ScreenFrame } from '../components/shared/ScreenFrame/screen-frame';
import {
  AuthForm,
  AuthHeader,
  AuthHeaderWrapper,
  AuthWrapper,
  LoaderComponent,
  RulesFlexRow,
  RulesText,
  RulesWrapper,
  StyledLogo,
  TouchableRippleStyled,
  TouchableText,
} from '../components/auth-screens/auth-styled';
import { AUTH_LOGO } from '../assets/app';
import ValidatedTextField from '../components/shared/validated-text-field/validated-text-field';
import { TRANSPARENT_COLOR } from '../constants/colors';
import { MOBILE_REGEX } from '../constants/regex';
import { ActivityIndicator, Alert, Keyboard, TouchableOpacity } from 'react-native';
import * as requests from '../state/requests';
import { connect } from 'react-redux';
import { AppState } from '../state/types';
import { bindActionCreators } from 'redux';
import { AuthScreens } from '../navigation/screens';

const LoginScreen: React.FunctionComponent<LoginScreenProps> = ({
  navigation,
  onLogin,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const showError = (field: boolean) => {
    if (isFormSubmitted || phoneNumber.length > 9) {
      if (field) {
        return true;
      }
    }
    return false;
  };

  const updatePhoneNumber = (
    _name: string,
    text: string,
    hasError: boolean,
  ) => {
    setPhoneNumber(text);
    setPhoneNumberError(hasError);
  };

  const onLoginClicked = async () => {
    if (phoneNumberError) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }
    setIsFormSubmitted(true);
    Keyboard.dismiss();
    await onLogin(phoneNumber);
    setIsFormSubmitted(false);
    navigation.navigate(AuthScreens.VerifyOtp, {phoneNumber});
  };

  return (
    <ScreenFrame>
      <AuthWrapper>
        <AuthHeaderWrapper>
          <StyledLogo source={AUTH_LOGO} resizeMode={'contain'} />
          <AuthHeader>Sign in to</AuthHeader>
          <AuthHeader>Synapse</AuthHeader>
        </AuthHeaderWrapper>
        <AuthForm>
          <ValidatedTextField
            name='phoneNumber'
            onValueUpdated={updatePhoneNumber}
            value={phoneNumber}
            required
            keyboardType='numeric'
            returnKeyType='next'
            min={1}
            placeholder={'Phone Number...'}
            placeholderTextColor={'#808080'}
            inputBackgroundColor={'#F2F2F2'}
            selectTextOnFocus
            selectionColor='rgba(0, 14, 96, 0.2)'
            borderColor={TRANSPARENT_COLOR}
            borderRadius={40}
            regExp={MOBILE_REGEX}
            leftIcon={{
              name: 'tablet',
              type: 'feather',
              color: '#808080',
            }}
            errorMessage={
              showError(phoneNumberError)
                ? 'Please enter a valid phone number'
                : ''
            }
          />
        </AuthForm>
        {(!isFormSubmitted && (
          <TouchableRippleStyled
            rippleColor='rgba(0, 0, 0, .2)'
            onPress={onLoginClicked}
            borderless={true}
          >
            <TouchableText>Sign In</TouchableText>
          </TouchableRippleStyled>
        )) || (
          <LoaderComponent>
            <ActivityIndicator color={'#FFF'} size={26} />
          </LoaderComponent>
        )}
        <RulesWrapper>
          <RulesText>By Clicking on Signin you agree to</RulesText>
          <RulesFlexRow>
            <RulesText>our </RulesText>
            <TouchableOpacity onPress={() => console.log('Terms')}>
              <RulesText hasLink>Terms & Conditions</RulesText>
            </TouchableOpacity>
            <RulesText> and </RulesText>
            <TouchableOpacity onPress={() => console.log('Terms')}>
              <RulesText hasLink>Privacy Policy</RulesText>
            </TouchableOpacity>
          </RulesFlexRow>
        </RulesWrapper>
      </AuthWrapper>
    </ScreenFrame>
  );
};

type StateProps = {};

type OwnProps = NavigationFocusInjectedProps & {};

type TransformerProps = {
  onLogin: typeof requests.user.onLogin;
};

type LoginScreenProps = OwnProps & StateProps & TransformerProps;

export default connect<StateProps, TransformerProps, OwnProps, AppState>(
  () => ({}),
  (dispatch) => {
    return bindActionCreators(
      {
        onLogin: requests.user.onLogin,
      },
      dispatch,
    );
  },
)(LoginScreen);
