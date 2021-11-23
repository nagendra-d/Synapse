import {
  ValidationMessages,
  ValidationRule,
  ValidationRuleConfig,
  ValidationValue,
} from '../types/validator-types';
import { validatorRules } from '../helpers/validator-rules';
import * as _ from 'lodash';

const validatorMessages = {
  numbers: `{0} must be a valid number`,
  email: `Please enter a valid {2}`,
  required: `Please enter a valid {2}`,
  date: `{0} must be a valid date ({1})`,
  minValueLength: `{0} must be at least {1} characters`,
  maxValueLength: `{0} must be less than {1} characters`,
  min: `{0} must be greater than {1}`,
  max: `{0} must be less than {1}`,
  isEqualTo: `{0} must be exactly {1} characters`,
  regExp: `{0} must have a valid format`,
  isPhone: `{0} must have a valid phone number`,
};

export class ValidatorService {
  private readonly rules: ValidationRuleConfig;
  private readonly messages: ValidationMessages;

  constructor() {
    this.rules = validatorRules;
    this.messages = validatorMessages;
  }

  public validateField(
    label: string,
    rules: ValidationRule,
    value: ValidationValue,
  ) {
    const errors: string[] = [];
    Object.entries(rules).map(([key]) => {
      // TODO: Need to remove lodash and replace with appropriate code without effecting typescript.
      const validateRule = _.get(this.rules, key);
      const validateValue = _.get(rules, key);

      if ((!value && !rules.required) || validateValue === undefined) {
        return;
      }

      const isRuleFn = typeof validateRule === 'function';
      const isRegExp = validateRule instanceof RegExp;

      if (
        (isRuleFn && !validateRule(validateValue, value)) ||
        (isRegExp && !validateRule.test(value))
      ) {
        errors.push(this.addError(label, key, validateValue));
      }
    });
    return errors && errors[0];
  }

  private addError(label: string, rule: string, value: ValidationValue) {
    // TODO: Props to accept dynamic error message.
    const message = this.messages[rule as keyof ValidationMessages];
    return message!
      .replace('{0}', label.replace(' (required)', ''))
      .replace('{1}', value.toString().toLowerCase())
      .replace('{2}', label.toLowerCase().replace(' (required)', ''));
  }
}
