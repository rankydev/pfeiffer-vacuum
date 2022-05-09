export const variants = ['primary', 'secondary', 'inverted']
export const shapes = ['filled', 'outlined', 'plain']
export const sizes = ['xsmall', 'small', 'normal']
export const icon = 'arrow_forward'
export const label = 'Button text'

const prepred = { prependIcon: true, icon: 'arrow_back' }

const generateContent = (variant, shapes) => {
  return shapes.map((shape) => {
    return sizes.reduce((memo, size) => {
      const basic = { variant, shape, size, icon, label }
      const prepend = { ...basic, ...prepred }
      const textOnly = { ...basic, icon: null }
      const iconOnly = { ...basic, label: null }

      const elements = [basic, prepend, textOnly, iconOnly].reduce(
        (memo, element) => {
          return [...memo, element, { ...element, disabled: true }]
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
export default {}
