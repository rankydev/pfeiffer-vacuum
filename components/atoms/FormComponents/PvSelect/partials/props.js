export default {
  /**
   * The input’s value
   */
  value: {
    type: [String, Object, Array],
    default: '',
  },
  /**
   * The isRequired prop, which defines if the select field is required or not
   */
  isRequired: {
    type: Boolean,
    default: false,
  },
  /**
   * Can be an array of objects or array of strings. When using objects, will look for a label, value, icon and disabled keys. T
   */
  options: {
    type: Array,
    required: true,
  },
  /**
   * Tells what key to use when generating option labels when each option is an object.
   */
  optionLabel: {
    type: String,
    default: 'label',
  },
  /**
   * Prepend string to label
   */
  prependLabel: {
    type: String,
    default: '',
  },
  /**
   * Sets input label
   */
  label: {
    type: String,
    default: null,
  },
  /**
   * An icon which will be prepended on the input field
   * @see [Icon List] (https://fonts.google.com/icons?selected=Material+Icons)
   */
  prependIcon: {
    type: String,
    default: '',
  },
  /**
   * Reduces the prop to receive only the data that's required
   * https://vue-select.org/guide/values.html#transforming-selections
   */
  reduce: {
    type: Function,
    default: (option) => option,
  },
  /**
   * disables complete selectbox
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * rules that will be passed into validator
   */
  rules: {
    type: Object,
    default: () => ({}),
  },
  /**
   * defines wether the validation should be turned on or off for this select
   */
  validate: {
    type: Boolean,
    default: false,
  },
  /**
   * enables multi selection
   */
  multiple: {
    type: Boolean,
    default: false,
  },
  /**
   * optional placeholder to replace the default text
   */
  placeholder: {
    type: String,
    default: '',
  },
  /**
   * Selected option can be deselected
   */
  clearable: {
    type: Boolean,
    default: true,
  },
  /**
   * Size of the used icon
   */
  iconSize: {
    type: String,
    default: 'base',
  },
}
