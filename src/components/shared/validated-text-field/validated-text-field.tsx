import React from 'react';
import { Platform, ReturnKeyType, View } from 'react-native';
import styled from 'styled-components/native';
import {
  BLACK_COLOR,
  LABEL_TEXT_COLOR,
  MAIN_BLUE,
  RED_COLOR,
  TRANSPARENT_COLOR,
} from '../../../constants/colors';
import { ValidationRule } from '../../../types/validator-types';
import { validatorService } from '../../../services';
import { Icon, Input, InputProps } from 'react-native-elements';

export default class ValidatedTextField extends React.Component<
  ValidatedTextFieldProps,
  ValidatedTextFieldState
> {
  public inputRef: any = React.createRef();
  public error?: string;
  public state: ValidatedTextFieldState;

  private validationRules: ValidationRule = {};

  constructor(props: ValidatedTextFieldProps) {
    super(props);
    this.state = {
      hidePassword: true,
    };
  }

  private changePasswordType = () => {
    const { hidePassword } = this.state;
    this.setState({ hidePassword: !hidePassword });
  };

  public onValueUpdated(value: string) {
    const { onValueUpdated, name } = this.props;

    if ('function' === typeof onValueUpdated) {
      onValueUpdated(name!, value, !!this.error);
    }
  }

  public onChangeValue = (value: string) => {
    const { label, placeholder } = this.props;
    this.error = validatorService.validateField(
      (label as string) || placeholder || '',
      this.validationRules,
      value.trim(),
    );
    this.onValueUpdated(value);
  };

  public componentDidMount(): void {
    const {
      required,
      email,
      minValueLength,
      maxValueLength,
      isEqualTo,
      regExp,
      date,
      numbers,
      isPhone,
    } = this.props;
    this.validationRules = {
      required,
      email,
      minValueLength,
      maxValueLength,
      isEqualTo,
      regExp,
      date,
      numbers,
      isPhone,
    };
  }

  public render() {
    const { hasSecureTextEntry, returnKeyType } = this.props;
    const { hidePassword } = this.state;
    return (
      <InputWrapper>
        <Input
          ref={this.inputRef}
          labelStyle={{
            color: this.props.labelTextColor || MAIN_BLUE,
            fontWeight: '400',
            paddingLeft: this.props.iconColor ? 10 : 0,
            marginBottom: 5,
          }}
          inputStyle={{
            color: this.props.inputTextColor || BLACK_COLOR,
            fontWeight: '400',
            fontFamily: 'Roboto_400Regular',
            fontSize: 16,
            minHeight: 40,
            elevation: 0,
            paddingTop: 3,
            paddingLeft: 5,
            marginBottom: Platform.OS === 'android' ? -15 : 0,
          }}
          inputContainerStyle={{
            borderBottomColor: this.props.errorMessage
              ? RED_COLOR
              : this.props!.borderColor || BLACK_COLOR,
            borderWidth: 1,
            borderColor: this.props.errorMessage
              ? '#FF0000'
              : TRANSPARENT_COLOR,
            backgroundColor:
              this.props.inputBackgroundColor || TRANSPARENT_COLOR,
            padding: this.props.iconColor ? '10 40 2 10' : 0,
            height: Platform.OS === 'android' ? 60 : 'auto',
            borderRadius: this.props.borderRadius ? this.props.borderRadius : 0,
            paddingLeft: this.props.borderRadius
              ? 20
              : this.props.iconColor
              ? 10
              : 5,
          }}
          errorStyle={{
            paddingLeft: this.props.borderRadius ? 25 : 0,
          }}
          onChangeText={this.onChangeValue}
          selectionColor={LABEL_TEXT_COLOR}
          returnKeyType={returnKeyType ? returnKeyType : 'done'}
          errorMessage={this.error}
          secureTextEntry={hasSecureTextEntry !== undefined && hidePassword}
          textAlignVertical='top'
          {...this.props}
        />
        {hasSecureTextEntry !== undefined && (
          <PasswordIcon>
            <PasswordTouchable onPress={this.changePasswordType}>
              <View>
                <Icon
                  name={hidePassword ? 'eye-off' : 'eye'}
                  type={'feather'}
                  size={24}
                />
              </View>
            </PasswordTouchable>
          </PasswordIcon>
        )}
      </InputWrapper>
    );
  }
}

type OwnProps = {
  onValueUpdated?: (name: string, text: string, hasError: boolean) => void;
  name?: string;
  hasSecureTextEntry?: boolean;
  textColor?: string;
  borderColor?: string;
  borderRadius?: number;
  errorColor?: string;
  inputBackgroundColor?: string;
  iconColor?: boolean;
  inputTextColor?: string;
  labelTextColor?: string;
  returnKeyType?: ReturnKeyType;
};

type ValidatedTextFieldProps = OwnProps & ValidationRule & InputProps;

type ValidatedTextFieldState = {
  hidePassword?: boolean;
};

const InputWrapper = styled.View`
  margin-bottom: 20px;
  flex: 1;
`;

const PasswordIcon = styled.View`
  position: absolute;
  top: 28px;
  right: 30px;
  width: 50px;
  height: 50px;
  justify-content: center;
`;

const PasswordTouchable = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  justify-content: center;
`;
/*
const StyledInput = styledNative<StyledInputProps>((props) => {
  return <Input {...props} />;
})`
  .labelStyle {
    color: ${(props) => props.labelTextColor || MAIN_BLUE};
    font-weight: 400;
    padding-left: ${(props) => (props.iconColor ? '10px' : '0')};
    margin-bottom: 5px;
  }

  .inputStyle {
    color: ${(props) => props.inputTextColor || BLACK_COLOR};
    font-weight: 400;
    font-family: Roboto_400Regular;
    font-size: 16px;
    min-height: 40px;
    elevation: 0;
    padding-top: 3px;
    padding-left: 5px;
    margin-bottom: ${Platform.OS === 'android' ? '-15' : '0'}; 
  }

  .inputContainerStyle {
    border-bottom-color: ${(props) => {
      return !props.borderRadius && props.errorMessage
        ? RED_COLOR
        : props!.borderColor || BLACK_COLOR;
    }};
    background-color: ${(props) =>
      props.inputBackgroundColor || TRANSPARENT_COLOR};
    padding: ${(props) => (props.iconColor ? '10px 40px 2px 10px' : '0')};
    height: ${Platform.OS === 'android' ? '60' : 'auto'};
    border-radius: ${(props) =>
      props.borderRadius ? props.borderRadius : '0'}px;
    padding-left: ${(props) =>
      props.borderRadius
        ? '20px'
        : props.iconColor
        ? '10px 40px 2px 10px'
        : '5px'};
  }
  .errorStyle {
    padding-left: ${(props) => (props.borderRadius ? '25px' : '0')};
  }
`;*/

/*type StyledInputProps = InputProps & {
  borderColor?: string;
  borderRadius?: number;
  errorMessage?: string;
  textColor?: string;
  multiline?: boolean;
  textAlignVertical?: string;
  inputBackgroundColor?: string;
  iconColor?: boolean;
  inputTextColor?: string;
  labelTextColor?: string;
  returnKeyType?: string;
};*/
