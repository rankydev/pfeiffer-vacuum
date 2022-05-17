import GenericCard from '~/components/atoms/GenericCard/GenericCard.vue'
import {
  imageSizes,
  subheading,
  heading,
  tag,
  description,
  additionalInfo,
} from '~/components/atoms/GenericCard/GenericCard.stories.content.js'

export default {
  title: 'Technical Components/GenericCard',
  component: GenericCard,
  parameters: {
    docs: {
      description: {
        component:
          'The generic card is an abstract Component which can be used to define the different card components like product card or blog card.',
      },
    },
  },
  argTypes: {
    imageSize: {
      options: imageSizes,
      control: { type: 'inline-radio' },
    },

    // slots
    tag: {
      control: {
        type: 'text',
      },
      defaultValue: tag,
      meta_description: 'slot content',
      table: {
        type: {
          summary: null,
        },
      },
    },

    image: {
      control: {
        type: 'text',
      },
      defaultValue: '<img src="http://placekitten.com/g/200/300" />',
      meta_description: 'slot content',
      table: {
        type: {
          summary: null,
        },
      },
    },

    subheading: {
      control: {
        type: 'text',
      },
      defaultValue: subheading,
      meta_description: 'slot content',
      table: {
        type: {
          summary: null,
        },
      },
    },

    heading: {
      control: {
        type: 'text',
      },
      defaultValue: heading,
      meta_description: 'slot content',
      table: {
        type: {
          summary: null,
        },
      },
    },

    tags: {
      control: {
        type: 'text',
      },
      defaultValue: tag,
      meta_description: 'slot content',
      table: {
        type: {
          summary: null,
        },
      },
    },

    description: {
      control: {
        type: 'text',
      },
      defaultValue: description,
      meta_description: 'slot content',
      table: {
        type: {
          summary: null,
        },
      },
    },

    additionalInfo: {
      control: {
        type: 'text',
      },
      defaultValue: additionalInfo,
      meta_description: 'slot content',
      table: {
        type: {
          summary: null,
        },
      },
    },

    actionItems: {
      control: {
        type: 'text',
      },
      defaultValue: 'Action items',
      meta_description: 'slot content',
      table: {
        type: {
          summary: null,
        },
      },
    },
  },
}

const Template = (args) => ({
  components: { GenericCard },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview" style="width: 300px; padding: 20px; background-color: #ccc;">
    <GenericCard v-bind="args">
      <template v-if="'tag' in args" v-slot:tag>${args.tag}</template>
      <template v-if="'image' in args" v-slot:image>${args.image}</template>
      <template v-if="'subheading' in args" v-slot:subheading>${args.subheading}</template>
      <template v-if="'heading' in args" v-slot:heading>${args.heading}</template>
      <template v-if="'tags' in args" v-slot:tags>${args.tags}</template>
      <template v-if="'description' in args" v-slot:description>${args.description}</template>
      <template v-if="'additionalInfo' in args" v-slot:additionalInfo>${args.additionalInfo}</template>
      <template v-if="'actionItems' in args" v-slot:actionItems>${args.actionItems}</template>
    </GenericCard>
  </div>
`,
})

export const Default = Template.bind({})

Default.args = {
  imageSize: imageSizes[0],
}
