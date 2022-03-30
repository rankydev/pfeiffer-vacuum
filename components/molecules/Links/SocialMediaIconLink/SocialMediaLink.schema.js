import Link from '~/components/atoms/Link/Link.schema.js'

export default {
  name: 'SocialMediaIconLink',
  display_name: 'Social Media Entry',
  schema: {
    icon: {
      type: 'option',
      use_uuid: true,
      required: true,
      options: [
        {
          value: 'facebook',
          name: 'Facebook',
        },
        {
          value: 'twitter',
          name: 'Twitter',
        },
        {
          value: 'linkedin',
          name: 'LinkedIn',
        },
        {
          value: 'youtube',
          name: 'Youtube',
        },
        {
          value: 'xing',
          name: 'Xing',
        },
        {
          value: 'wechat',
          name: 'WeChat',
        },
        {
          value: 'zhihu',
          name: 'Zhihu',
        },
      ],
    },
    title: {
      type: 'text',
      display_name: 'Title',
      translatable: true,
    },
    ...Link.schema,
  },
  image: null,
  preview_field: null,
  is_root: false,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'SocialMediaIconLink',
  component_group_uuid: null,
}
