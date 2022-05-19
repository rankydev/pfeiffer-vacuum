import RichtextBasic from '~/components/atoms/Richtext/RichtextBasic.schema'

export default {
  name: 'FooterNewsletter',
  display_name: 'Footer Newsletter',
  schema: {
    headline: {
      type: 'text',
      translatable: true,
    },
    richtext: {
      type: 'bloks',
      maximum: 1,
      restrict_components: true,
      component_whitelist: ['RichtextBasic'],
      display_name: 'Description',
    },
    buttons: {
      type: 'bloks',
      restrict_components: true,
      component_whitelist: ['Button'],
      display_name: 'Buttons',
    },
    links: {
      type: 'bloks',
      restrict_components: true,
      component_whitelist: ['TextLink'],
      display_name: 'Links',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'FooterNewsletter',
  component_group_name: 'Global',
}
