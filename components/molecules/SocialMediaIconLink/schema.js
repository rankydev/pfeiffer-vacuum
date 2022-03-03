module.exports = {
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
    link: {
      type: 'bloks',
      restrict_components: true,
      component_whitelist: ['Link'],
      pos: 1,
      maximum: 1,
      description: 'Link for the entry',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'SocialMediaIconLink',
  component_group_uuid: null,
}
