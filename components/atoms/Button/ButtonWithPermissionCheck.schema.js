import Button from './Button.schema.js'
import Link from '~/components/atoms/Link/Link.schema.partial.js'

export default {
  name: 'ButtonWithPermissionCheck',
  display_name: 'Button with permission check',
  schema: {
    onlyApproved: {
      type: 'boolean',
      description: 'Restrict link button to only approved users',
    },
    loginNeeded: {
      type: 'boolean',
      description:
        'Redirect to login instead of opening link if user is not logged in',
    },
    ...Button.schema,
    ...Link,
  },
  image: null,
  preview_field: null,
  preview_tmpl: '<div>{{ label }}</div>',
  is_root: false,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'ButtonWithPermissionCheck',
  component_group_uuid: null,
}
