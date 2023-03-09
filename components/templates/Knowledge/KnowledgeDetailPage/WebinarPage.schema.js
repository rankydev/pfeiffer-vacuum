import Seo from '~/components/templates/Page/PageSeo.schema.partial.js'
import Social from '~/components/templates/Page/PageSocial.schema.partial.js'
import Page from '~/components/templates/Page/Page.schema.js'
import Template from '~/components/templates/Knowledge/KnowledgeDetailPage/KnowledgeDetailPageTemplate.schema.partial'

export default {
  name: 'webinarKnowledgeDocument',
  display_name: 'Webinar',
  schema: {
    title: Page.schema.title,
    image: {
      type: 'asset',
      pos: 1,
      filetypes: ['images'],
      description: 'Image for this Webinar',
      display_name: 'Image',
      required: true,
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
        'The languages in which the Webinar is available. Dont forget to add the localized values for all languages that are selected here.',
      display_name: 'Languages',
      default_value: '',
    },
    keyOrVod: {
      type: 'text',
      max_length: '255',
      regex: '',
      display_name: 'GotoWebinar-Key or Recording Link',
      description: 'The key for the GotoMeeting or the link to the recording',
      default_value: '',
      pos: 3,
      required: true,
    },
    duration: {
      type: 'text',
      pos: 4,
      max_length: '7',
      regex: '^$|^(\\d{0,2}h?)?( )?(\\d{1,2}m)$',
      description: 'Duration of the recorded Webinar. Example: 1h 25m or 45m',
      display_name: 'Duration',
    },
    summary: {
      type: 'textarea',
      max_length: '',
      translatable: true,
      required: true,
      display_name: 'Summary',
      description: 'Short summary of the Webinar',
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
          value: 'webinar',
          name: 'Webinar',
        },
      ],
      default_value: 'webinar',
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
  real_name: 'Webinar',
  component_group_name: 'Templates',
  color: null,
  icon: null,
}