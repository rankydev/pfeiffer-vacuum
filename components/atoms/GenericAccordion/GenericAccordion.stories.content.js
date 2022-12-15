export const accordionEntries = [
  {
    label: 'initial open',
    isActive: true,
    disabled: false,
    slotName: 'item_1',
  },
  {
    label: 'second item',
    isActive: false,
    disabled: false,
    slotName: 'item_2',
  },
  {
    label: 'disabled',
    isActive: false,
    disabled: true,
    slotName: 'item_3',
  },
  {
    label: 'Accordion with Icon and Expand Icon',
    isActive: false,
    disabled: false,
    slotName: 'item_4',
    icon: 'check_circle',
    expandIcon: 'edit',
  },
  {
    label: 'disabled Accordion with Expand Icon',
    isActive: false,
    disabled: true,
    slotName: 'item_5',
    expandIcon: 'edit_off',
  },
  {
    label: 'loading Accordion',
    isActive: false,
    disabled: false,
    slotName: 'item_6',
    loading: true,
  },
]

export const levels = ['h3', 'paragraph']

export default {}
