import React, { useState } from 'react';
import { NavigationFocusInjectedProps } from 'react-navigation';
import { ScreenFrame } from '../components/shared/ScreenFrame/screen-frame';
import {
  AuthHeader,
  AuthHeaderWrapper,
  AuthWrapper,
  FlexBox,
  LoaderComponent,
  SignupAuthForm,
  StyledLogo,
  TouchableRippleStyled,
  TouchableText,
} from '../components/auth-screens/auth-styled';
import { AUTH_LOGO } from '../assets/app';
import ValidatedTextField from '../components/shared/validated-text-field/validated-text-field';
import { TRANSPARENT_COLOR } from '../constants/colors';
import { ActivityIndicator, Keyboard } from 'react-native';
import * as requests from '../state/requests';
import { connect } from 'react-redux';
import { AppState } from '../state/types';
import { bindActionCreators } from 'redux';
import { AuthScreens } from '../navigation/screens';
import {
  MOBILE_REGEX,
  ONLY_CHARS_REGEX,
  VALID_EMAIL,
} from '../constants/regex';
import { Option, Select } from 'react-native-select-lists';
import { Icon } from 'react-native-elements';

const CreateContactScreen: React.FunctionComponent<CreateContactScreenProps> = ({
  navigation,
  onLogin,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [designation, setDesignation] = useState('');
  const [nameError, setNameError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [phoneNumberError, setPhoneNumberError] = useState(true);
  const [designationError, setDesignationError] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [showErrorMessages, setShowErrorsMessages] = useState(false);
  /*const [isVisible, setIsVisible] = useState(false);
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];*/

  const showError = (field: boolean) => {
    if (showErrorMessages || phoneNumber.length > 9) {
      if (field) {
        return true;
      }
    }
    return false;
  };

  const updateInputValue = (name: string, text: string, hasError: boolean) => {
    console.log(designation);
    if (name === 'phoneNumber') {
      setPhoneNumber(text);
      setPhoneNumberError(hasError);
    }
    if (name === 'name') {
      setName(text);
      setNameError(hasError);
    }
    if (name === 'email') {
      setEmail(text);
      setEmailError(hasError);
    }
    if (name === 'designation') {
      setDesignation(text);
      setDesignationError(hasError);
    }
  };

  const onLoginClicked = async () => {
    setShowErrorsMessages(true);
    if (nameError || emailError || designationError || phoneNumberError) {
      return;
    }
    setIsFormSubmitted(true);
    Keyboard.dismiss();
    await onLogin(phoneNumber);
    setIsFormSubmitted(false);
    navigation.navigate(AuthScreens.VerifyOtp, { phoneNumber });
  };

  return (
    <ScreenFrame>
      <AuthWrapper>
        <AuthHeaderWrapper>
          <StyledLogo source={AUTH_LOGO} resizeMode={'contain'} />
          <AuthHeader>Create a new</AuthHeader>
          <AuthHeader>account</AuthHeader>
        </AuthHeaderWrapper>
        <SignupAuthForm>
          <FlexBox hasError={showError(nameError)}>
            <ValidatedTextField
              name='name'
              onValueUpdated={updateInputValue}
              value={name}
              required
              keyboardType='default'
              returnKeyType='next'
              min={1}
              placeholder={'Name'}
              placeholderTextColor={'#808080'}
              inputBackgroundColor={'#F2F2F2'}
              selectTextOnFocus
              selectionColor='rgba(0, 14, 96, 0.2)'
              borderColor={TRANSPARENT_COLOR}
              borderRadius={40}
              regExp={ONLY_CHARS_REGEX}
              leftIcon={{
                name: 'user',
                type: 'feather',
                color: '#808080',
              }}
              errorMessage={
                showError(nameError) ? 'Please enter valid Name' : ''
              }
            />
          </FlexBox>
          <FlexBox hasError={showError(emailError)}>
            <ValidatedTextField
              name='email'
              onValueUpdated={updateInputValue}
              value={email}
              required
              keyboardType='email-address'
              returnKeyType='next'
              min={1}
              placeholder={'Email'}
              placeholderTextColor={'#808080'}
              inputBackgroundColor={'#F2F2F2'}
              selectTextOnFocus
              selectionColor='rgba(0, 14, 96, 0.2)'
              borderColor={TRANSPARENT_COLOR}
              borderRadius={40}
              regExp={VALID_EMAIL}
              leftIcon={{
                name: 'mail',
                type: 'feather',
                color: '#808080',
              }}
              errorMessage={
                showError(emailError) ? 'Please enter valid Email' : ''
              }
            />
          </FlexBox>
          <FlexBox hasError={showError(phoneNumberError)}>
            <ValidatedTextField
              name='phoneNumber'
              onValueUpdated={updateInputValue}
              value={phoneNumber}
              required
              keyboardType='phone-pad'
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
                  ? 'Please enter valid Phone number'
                  : ''
              }
            />
          </FlexBox>
          <FlexBox hasError={showError(designationError)}>
            <Select
              padding={30}
              selectStyle={{
                marginHorizontal: 10,
                paddingVertical: 30,
                borderRadius: 50,
              }}
              selectTextStyle={{
                fontWeight: '400',
                fontFamily: 'Roboto_400Regular',
                fontSize: 16,
                color: '#808080',
              }}
              caret={
                <Icon
                  type={'feather'}
                  name={'chevron-down'}
                  color={'#808080'}
                  style={{
                    width: 32,
                    height: 32,
                    alignSelf: 'center',
                    marginTop: 8,
                  }}
                />
              }
            >
              <Option value={0}>Designation</Option>
              <Option value={1}>List item 1</Option>
              <Option value={2}>List item 2</Option>
              <Option value={3}>List item 3</Option>
            </Select>
          </FlexBox>
        </SignupAuthForm>
        {(!isFormSubmitted && (
          <TouchableRippleStyled
            rippleColor='rgba(0, 0, 0, .2)'
            onPress={onLoginClicked}
            borderless={true}
          >
            <TouchableText>Create Account</TouchableText>
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

type CreateContactScreenProps = OwnProps & StateProps & TransformerProps;

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
)(CreateContactScreen);
