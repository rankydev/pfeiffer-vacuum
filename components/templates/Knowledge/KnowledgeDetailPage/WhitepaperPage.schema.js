import Seo from '~/components/templates/Page/PageSeo.schema.partial.js'
import Social from '~/components/templates/Page/PageSocial.schema.partial.js'
import Template from '~/components/templates/Knowledge/KnowledgeDetailPage/KnowledgeDetailPageTemplate.schema.partial'

export default {
  name: 'whitePaperKnowledgeDocument',
  display_name: 'Whitepaper',
  schema: {
    title: {
      type: 'text',
      translatable: true,
      max_length: '255',
      required: true,
      description: 'The title of the White Paper',
      display_name: 'Title',
      default_value: '',
      pos: 0,
    },
    image: {
      type: 'asset',
      pos: 1,
      filetypes: ['images'],
      required: true,
      description: 'Image for this White Paper',
      display_name: 'Image',
    },
    languages: {
      type: 'options',
      pos: 2,
      required: true,
      min_options: '1',
      options: [
        {
          value: '',
          name: '',
        },
      ],
      source: 'internal',
      datasource_slug: 'available-languages-for-knowledge-stories',
      description:
        'The languages in which the White Paper is available. Dont forget to add the localized values for all languages that are selected here.',
      display_name: 'Languages',
      default_value: '',
    },
    download: {
      type: 'asset',
      filetypes: ['texts'],
      display_name: 'Whitepaper Download',
      description: 'The White Paper as downloadable PDF',
      pos: 3,
      translatable: true,
    },
    date: {
      type: 'datetime',
      required: true,
      description: '',
      display_name: 'Date',
      default_value: 'Date for this White Paper. Schema: yyyy-mm-dd',
      disable_time: true,
      translatable: false,
      pos: 4,
    },
    summary: {
      type: 'textarea',
      max_length: '',
      translatable: true,
      required: true,
      display_name: 'Short Description',
      description: 'Short summary of the White Paper',
      pos: 5,
    },
    pageComponents: {
      type: 'bloks',
      display_name: 'Page Components',
    },
    knowledgeType: {
      type: 'option',
      options: [
        {
          value: 'whitepaper',
          name: 'Whitepaper',
        },
      ],
      default_value: 'whitepaper',
      use_uuid: true,
      required: true,
    },
    ...Seo,
    ...Social,
    ...Template,
  },
  image: null,
  preview_field: 'title',
  is_root: true,
  preview_tmpl: '',
  is_nestable: false,
  all_presets: [],
  preset_id: null,
  real_name: 'Whitepaper',
  component_group_name: 'Templates',
  color: null,
  icon: null,
}
