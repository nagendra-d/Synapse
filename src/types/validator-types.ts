export type ValidationRuleConfig = {
  numbers?: RegExp;
  email?: RegExp;
  required?: RegExp;
  regExp?: (expression: RegExp, value: string) => boolean;
  date?: (format: string, value: string) => boolean;
  minValueLength?: (length: number, value: string) => boolean;
  maxValueLength?: (length: number, value: string) => boolean;
  min?: (length: number, value: string) => boolean;
  max?: (length: number, value: string) => boolean;
  isEqualTo?: (length: number, value: string) => boolean;
  isPhone?: (_c: boolean, value: string) => boolean;
};

export type ValidationRule = {
  numbers?: boolean;
  email?: boolean;
  required?: boolean;
  regExp?: RegExp;
  date?: string;
  minValueLength?: number;
  maxValueLength?: number;
  min?: number;
  max?: number;
  isEqualTo?: number;
  isPhone?: boolean;
};

export type ValidationMessages = {
  numbers?: string;
  email?: string;
  required?: string;
  minValueLength?: string;
  maxValueLength?: string;
  min?: string;
  max?: string;
  regExp?: string;
  isPhone?: string;
};

export type ValidationValue = string | boolean | number;
