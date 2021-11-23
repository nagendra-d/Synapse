import React, { useState } from 'react';
import { NavigationFocusInjectedProps } from 'react-navigation';
import { ScreenFrame } from '../components/shared/ScreenFrame/screen-frame';
import {
  AuthFormInline,
  AuthHeader,
  AuthHeaderWrapper,
  AuthWrapper,
  LoaderComponent,
  OTPInputs,
  PhoneAuthForm,
  PhonesText,
  PhonesWrapper,
  StyledLogo,
  TouchableRippleStyled,
  TouchableText,
} from '../components/auth-screens/auth-styled';
import { AUTH_LOGO } from '../assets/app';
import ValidatedTextField from '../components/shared/validated-text-field/validated-text-field';
import { TRANSPARENT_COLOR } from '../constants/colors';
import { ActivityIndicator, Alert, Keyboard } from 'react-native';
import * as requests from '../state/requests';
import { connect } from 'react-redux';
import { AppState } from '../state/types';
import { bindActionCreators } from 'redux';
import { AppScreens } from '../navigation/screens';

const VerifyOtpScreen: React.FunctionComponent<LoginScreenProps> = ({
  navigation,
  onLogin,
}) => {
  const inputRefs: any = Array(4)
    .fill(0)
    .map((_) => React.createRef());
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [thirdNumber, setThirdNumber] = useState('');
  const [fourthNumber, setFourthNumber] = useState('');
  const [firstNumberError, setFirstNumberError] = useState(false);
  const [secondNumberError, setSecondNumberError] = useState(false);
  const [thirdNumberError, setThirdNumberError] = useState(false);
  const [fourthNumberError, setFourthNumberError] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const phoneNumber = navigation.getParam('phoneNumber');

  const updateOTPValue = (name: string, text: string, hasError: boolean) => {
    const inputs = [
      'firstNumber',
      'secondNumber',
      'thirdNumber',
      'fourthNumber',
    ];
    if (name === 'firstNumber') {
      setFirstNumber(text);
      setFirstNumberError(hasError);
    }
    if (name === 'secondNumber') {
      setSecondNumber(text);
      setSecondNumberError(hasError);
    }
    if (name === 'thirdNumber') {
      setThirdNumber(text);
      setThirdNumberError(hasError);
    }
    if (name === 'fourthNumber') {
      setFourthNumber(text);
      setFourthNumberError(hasError);
    }
    const nextIndex = inputs.indexOf(name) + 1;
    if (!hasError && nextIndex < inputs.length) {
      inputRefs[nextIndex].current!.inputRef.current.focus();
    } else if (nextIndex === inputs.length) {
      onLoginClicked();
    }
  };

  const onLoginClicked = async () => {
    if (
      firstNumberError ||
      secondNumberError ||
      thirdNumberError ||
      fourthNumberError
    ) {
      Alert.alert('Error', 'Please enter a OTP');
      return;
    }
    setIsFormSubmitted(true);
    Keyboard.dismiss();
    await onLogin('Nagendra');
    setIsFormSubmitted(false);
    navigation.navigate(AppScreens.Home);
  };

  return (
    <ScreenFrame>
      <AuthWrapper>
        <AuthHeaderWrapper>
          <StyledLogo source={AUTH_LOGO} resizeMode={'contain'} />
          <AuthHeader>Verification</AuthHeader>
          <AuthHeader>code</AuthHeader>
        </AuthHeaderWrapper>
        <PhoneAuthForm>
          <PhonesWrapper>
            <PhonesText>
              Verify your account by entering the 4 digits code we sent to: +91{' '}
              {phoneNumber}
            </PhonesText>
          </PhonesWrapper>
          <AuthFormInline>
            <ValidatedTextField
              ref={inputRefs[0]}
              name='firstNumber'
              onValueUpdated={updateOTPValue}
              value={firstNumber}
              required
              keyboardType='numeric'
              returnKeyType='next'
              min={1}
              max={1}
              maxLength={1}
              placeholder={'X'}
              placeholderTextColor={'#808080'}
              inputBackgroundColor={'#F2F2F2'}
              selectTextOnFocus
              selectionColor='rgba(0, 14, 96, 0.2)'
              borderColor={TRANSPARENT_COLOR}
              errorMessage={''}
              borderRadius={20}
              style={OTPInputs.inputs}
              autoFocus={true}
            />
            <ValidatedTextField
              ref={inputRefs[1]}
              name='secondNumber'
              onValueUpdated={updateOTPValue}
              value={secondNumber}
              required
              keyboardType='numeric'
              returnKeyType='next'
              min={1}
              maxLength={1}
              placeholder={'X'}
              placeholderTextColor={'#808080'}
              inputBackgroundColor={'#F2F2F2'}
              selectTextOnFocus
              selectionColor='rgba(0, 14, 96, 0.2)'
              borderColor={TRANSPARENT_COLOR}
              errorMessage={''}
              borderRadius={20}
              style={OTPInputs.inputs}
            />
            <ValidatedTextField
              ref={inputRefs[2]}
              name='thirdNumber'
              onValueUpdated={updateOTPValue}
              value={thirdNumber}
              required
              keyboardType='numeric'
              returnKeyType='next'
              min={1}
              maxLength={1}
              placeholder={'X'}
              placeholderTextColor={'#808080'}
              inputBackgroundColor={'#F2F2F2'}
              selectTextOnFocus
              selectionColor='rgba(0, 14, 96, 0.2)'
              borderColor={TRANSPARENT_COLOR}
              errorMessage={''}
              borderRadius={20}
              style={OTPInputs.inputs}
            />
            <ValidatedTextField
              ref={inputRefs[3]}
              name='fourthNumber'
              onValueUpdated={updateOTPValue}
              value={fourthNumber}
              required
              keyboardType='numeric'
              returnKeyType='next'
              min={1}
              maxLength={1}
              placeholder={'X'}
              placeholderTextColor={'#808080'}
              inputBackgroundColor={'#F2F2F2'}
              selectTextOnFocus
              selectionColor='rgba(0, 14, 96, 0.2)'
              borderColor={TRANSPARENT_COLOR}
              errorMessage={''}
              borderRadius={20}
              style={OTPInputs.inputs}
            />
          </AuthFormInline>
        </PhoneAuthForm>
        {(!isFormSubmitted && (
          <TouchableRippleStyled
            rippleColor='rgba(0, 0, 0, .2)'
            onPress={onLoginClicked}
            borderless={true}
          >
            <TouchableText>Verify</TouchableText>
          </TouchableRippleStyled>
        )) || (
          <LoaderComponent>
            <ActivityIndicator color={'#FFF'} size={26} />
          </LoaderComponent>
        )}
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
)(VerifyOtpScreen);
