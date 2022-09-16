import { required } from '@vuelidate/validators'

export const normal = {
  disabled: false,
  options: [
    {
      displayValue: 'OptionValue 1',
      value: 'OptionValue1',
      disabled: true,
    },
    {
      displayValue: 'OptionValue 2',
      value: 'OptionValue2',
    },
    {
      displayValue: 'OptionValue 3',
      value: 'OptionValue2',
    },
  ],
  optionLabel: 'displayValue',
}

export const withValue = {
  ...normal,
  value: normal.options[1].displayValue,
}

export const icon = {
  ...normal,
  prependIcon: 'info',
}

export const optionIcon = {
  ...normal,
  options: [
    {
      ...normal.options[0],
      icon: 'table_chart',
    },
    {
      ...normal.options[1],
      icon: 'privacy_tip',
    },
    {
      ...normal.options[2],
      icon: 'stacked_line_chart',
    },
  ],
}

export const disabled = {
  ...normal,
  disabled: true,
}

export const disabledWithValue = {
  ...withValue,
  disabled: true,
}

export const error = {
  ...normal,
  required: true,
  rules: { required },
  validate: true,
}

export const label = {
  ...normal,
  label: 'Label',
}

export const multiple = {
  options: [
    {
      displayValue: 'OptionValue 1',
      value: 'OptionValue1',
    },
    {
      displayValue: 'OptionValue 2',
      value: 'OptionValue2',
    },
    {
      displayValue: 'OptionValue 3',
      value: 'OptionValue2',
    },
  ],
  optionLabel: 'displayValue',
  multiple: true,
  placeholder: 'Multiselect Filter',
}

export default {}
