/* tslint:disable:no-any */
import React from 'react';
import { ReturnKeyType, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import {
  GREY_COLOR,
  LABEL_TEXT_COLOR,
  TRANSPARENT_COLOR,
} from '../../../constants/colors';
import { ValidationRule } from '../../../types/validator-types';
import { validatorService } from '../../../services';
import { HelperText, TextInput } from 'react-native-paper';
import { ErrorMessages } from '../../../constants/validation-error-messages';
import { Icon } from 'react-native-elements';
import { TextInputProps } from 'react-native-paper/lib/typescript/src/components/TextInput/TextInput';

export default class ValidatedMaterialTextField extends React.Component<
  ValidatedTextFieldProps,
  ValidatedTextFieldState
> {
  public error?: string;
  public state: ValidatedTextFieldState;
  public inputRef: any;

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
      min,
      max,
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
      min,
      max,
      isPhone,
    };
  }

  public render() {
    const {
      hasSecureTextEntry,
      returnKeyType,
      errorMessage,
      borderColor,
      noBottomMargin,
      inputBackgroundColor,
      hideErrorMessage,
      hasError,
    } = this.props;
    const { hidePassword } = this.state;
    return (
      <InputWrapper noBottomMargin={noBottomMargin}>
        <TextInput
          ref={(ref: any) => {
            if (ref) {
              this.inputRef = ref;
            }
          }}
          onChangeText={this.onChangeValue}
          selectionColor={LABEL_TEXT_COLOR}
          returnKeyType={returnKeyType ? returnKeyType : 'done'}
          errorMessage={this.error || hasError === true}
          secureTextEntry={hasSecureTextEntry !== undefined && hidePassword}
          textAlignVertical='top'
          underlineColor={borderColor || GREY_COLOR}
          error={!!this.error || hasError === true}
          theme={{ colors: { disabled: '#777' } }}
          style={{
            backgroundColor: inputBackgroundColor || TRANSPARENT_COLOR,
          }}
          {...this.props}
        />
        <HelperText
          type='error'
          visible={(!!this.error || hasError === true) && !hideErrorMessage}
        >
          {(errorMessage && errorMessage) || ErrorMessages.generic}
        </HelperText>
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
  errorColor?: string;
  inputBackgroundColor?: string;
  iconColor?: boolean;
  inputTextColor?: string;
  labelTextColor?: string;
  returnKeyType?: ReturnKeyType;
  errorMessage?: string;
  noBottomMargin?: boolean;
  hideErrorMessage?: boolean;
  hasError?: boolean;
};

type ValidatedTextFieldProps = OwnProps &
  ValidationRule &
  Omit<TextInputProps, 'theme'>;

type ValidatedTextFieldState = {
  hidePassword?: boolean;
};

const InputWrapper = styled(View)`
  margin-bottom: ${(props: OwnProps) => (props.noBottomMargin ? '0' : '20px')};
`;

const PasswordIcon = styled(View)`
  position: absolute;
  top: 28px;
  right: 30px;
  width: 50px;
  height: 50px;
  justify-content: center;
`;

const PasswordTouchable = styled(TouchableOpacity)`
  width: 100px;
  height: 100px;
  justify-content: center;
`;
