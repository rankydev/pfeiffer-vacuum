export const normal = {
  disableField: 'selectable',
  disabled: false,
  hidePlaceholder: false,
  multiple: false,
  options: [
    {
      displayValue: 'OptionValue1',
      selectable: true,
      selected: false,
      value: 'OptionValue1',
      icon: 'arrow_forward',
    },
    {
      displayValue: 'OptionValue2',
      selectable: true,
      selected: false,
      value: 'OptionValue2',
      icon: 'arrow_forward',
    },
  ],
  placeholder: null,
  reduce: () => {},
  textField: 'displayValue',
  value: undefined,
  variantSelection: true,
  valueField: 'value',
  name: 'Test123',
}

export const disabled = {
  ...normal,
  disabled: true,
}

export const error = {
  hasError: true,
  errorMessage: 'Sorry, an error occured',
  ...normal,
}

export const label = {
  label: 'Label',
  ...normal,
}
