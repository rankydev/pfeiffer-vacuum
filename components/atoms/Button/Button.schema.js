import Link from '~/components/atoms/Link/Link.schema.partial.js'

export default {
  name: 'Button',
  display_name: 'Button',
  schema: {
    label: {
      type: 'text',
      max_length: '56',
      translatable: true,
    },
    icon: {
      type: 'text',
      description:
        'Use an icon from https://fonts.google.com/icons here (e.g. calculate)',
    },
    prependIcon: {
      type: 'boolean',
      description: 'Switch to place the icon in front of the label',
    },
    disabled: {
      type: 'boolean',
      description: '',
    },
    variant: {
      type: 'option',
      exclude_empty_option: true,
      default_value: 'primary',
      description: 'The variants are for different stylings',
      options: [
        {
          value: 'primary',
          name: 'Primary',
        },
        {
          value: 'secondary',
          name: 'Secondary',
        },
        {
          value: 'inverted',
          name: 'Inverted',
        },
      ],
    },
    shape: {
      type: 'option',
      exclude_empty_option: true,
      default_value: 'filled',
      description:
        "Changes in shape wont change the button for the 'primary' variant",
      options: [
        {
          value: 'filled',
          name: 'Filled',
        },
        {
          value: 'outlined',
          name: 'Outlined',
        },
        {
          value: 'plain',
          name: 'Plain',
        },
      ],
    },
    size: {
      type: 'option',
      exclude_empty_option: true,
      default_value: 'normal',
      options: [
        {
          value: 'xsmall',
          name: 'Tiny',
        },
        {
          value: 'small',
          name: 'Small',
        },
        {
          value: 'normal',
          name: 'Normal',
        },
      ],
    },
    ...Link,
  },
  image: null,
  preview_field: null,
  preview_tmpl: '<div>{{ label }}</div>',
  is_root: false,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'Button',
  component_group_uuid: null,
}
