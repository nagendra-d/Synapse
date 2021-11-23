import moment from 'moment';
import { ValidationRuleConfig } from '../types/validator-types';
import { MOBILE_REGEX } from '../constants/regex';

export const validatorRules: ValidationRuleConfig = {
  numbers: /^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/,
  email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
  required: /\S+/,
  date(format: string = 'YYYY-MM-DD', value: string) {
    const d = moment(value, format);
    return !(d == null || !d.isValid());
  },
  minValueLength(length: number, value: string) {
    return value.length >= length;
  },
  maxValueLength(length: number, value: string) {
    return value.length < length;
  },
  isEqualTo(length: number, value: string) {
    return value.length === length;
  },
  min(length: number, value: string) {
    return parseInt(value, 10) >= length;
  },
  max(length: number, value: string) {
    return parseInt(value, 10) <= length;
  },
  regExp(expression: RegExp = /\S+/, value: string) {
    return expression.test(value);
  },
  isPhone(_c: boolean = true, value: string) {
    return MOBILE_REGEX.test(value);
  },
};
