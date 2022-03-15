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

// TODO: Render these

export const buttonVariants = [
  ...generateContent(variants[0], [shapes[0]]),
  ...generateContent(variants[1], shapes),
  ...generateContent(variants[2], shapes),
]

export default {}
