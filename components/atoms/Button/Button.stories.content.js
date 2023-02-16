export const variants = [
  'primary',
  'secondary',
  'inverted',
  'variant-selection',
  'variant-selection-preselected',
]
export const shapes = ['filled', 'outlined', 'plain']
export const sizes = ['xsmall', 'small', 'normal']
export const icon = 'arrow_forward'
export const label = 'Button text'

const prepred = { prependIcon: true, icon: 'arrow_back' }

const generateContent = (variant, shapeArr) => {
  return shapeArr.map((shape) => {
    return sizes.reduce((memo, size) => {
      const basic = { variant, shape, size, icon, label }
      const prepend = { ...basic, ...prepred }
      const textOnly = { ...basic, icon: null }
      const iconOnly = { ...basic, label: null }

      const elements = [basic, prepend, textOnly, iconOnly].reduce(
        (memoArr, element) => {
          return [...memoArr, element, { ...element, disabled: true }]
        },
        []
      )
      return [...elements, ...memo]
    }, [])
  })
}

export const buttonVariants = [
  ...generateContent(variants[0], [shapes[0]]),
  ...generateContent(variants[1], shapes),
  ...generateContent(variants[2], shapes),
]

export const buttonVariantsVariantSelection = [
  ...generateContent(variants[3], shapes.slice(0, 2)),
  ...generateContent(variants[4], shapes.slice(0, 1)),
]

export const buttonPrimary = {
  _uid: '2b6af927-5f0e-4c1a-be88-29bb5d04076d',
  icon: 'arrow_forward',
  size: 'normal',
  label: 'Button Text',
  shape: 'filled',
  variant: 'primary',
  disabled: false,
  component: 'Button',
  prependIcon: false,
  _editable:
    '<!--#storyblok#{"name": "Button", "space": "152017", "uid": "2b6af927-5f0e-4c1a-be88-29bb5d04076d", "id": "119228911"}-->',
}

export const buttonOutlinedSecondary = {
  _uid: '2b6af927-5f0e-4c1a-be88-29bb5d04076d',
  icon: 'arrow_forward',
  size: 'normal',
  label: 'Outlined Button',
  shape: 'outlined',
  variant: 'secondary',
  disabled: false,
  component: 'Button',
  prependIcon: false,
  _editable:
    '<!--#storyblok#{"name": "Button", "space": "152017", "uid": "2b6af927-5f0e-4c1a-be88-29bb5d04076d", "id": "119228911"}-->',
}

export const buttonFilledSecondary = {
  _uid: '3dd3700b-9e95-46d5-87ab-fd917b80848f',
  icon: 'arrow_forward',
  size: 'normal',
  label: 'Filled Button',
  shape: 'filled',
  variant: 'secondary',
  disabled: false,
  component: 'Button',
  prependIcon: false,
  _editable:
    '<!--#storyblok#{"name": "Button", "space": "152017", "uid": "3dd3700b-9e95-46d5-87ab-fd917b80848f", "id": "119228911"}-->',
}

export const buttonFilledThird = {
  _uid: '3dd3700b-9e95-46d5-87ab-fd917b80848f',
  icon: 'arrow_forward',
  size: 'normal',
  label: 'Filled Button',
  shape: 'filled',
  variant: 'inverted',
  disabled: false,
  component: 'Button',
  prependIcon: false,
  _editable:
    '<!--#storyblok#{"name": "Button", "space": "152017", "uid": "3dd3700b-9e95-46d5-87ab-fd917b80848f", "id": "119228911"}-->',
}

export const buttonOutlinedThird = {
  _uid: '3dd3700b-9e95-46d5-87ab-fd917b80848f',
  icon: 'mail_outline',
  label: 'Outlined Button',
  shape: 'outlined',
  variant: 'inverted',
  component: 'Button',
  _editable:
    '<!--#storyblok#{"name": "Button", "space": "152017", "uid": "2b6af927-5f0e-4c1a-be88-29bb5d04076d", "id": "119228911"}-->',
}
export default {}
