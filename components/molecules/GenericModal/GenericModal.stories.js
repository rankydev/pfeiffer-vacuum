import GenericModal from './GenericModal'

const argTypes = {
  isOpen: 'isModalOpen',
  headline: "'Your personal Price'",
  text: "'<p>Plain text can be added <u>also with underline</u> or <strong>strong</strong></p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est velit pharetra tincidunt rhoncus, sed. Morbi auctor neque in senectus nec, cursus urna augue varius. Natoque enim massa suscipit vitae ullamcorper mauris quis duis. Suspendisse risus, sapien commodo pulvinar. Sociis sollicitudin sit aliquam, arcu urna. Viverra vel parturient mauris sed sed sed platea etiam. Lectus id ultricies eu fermentum, at egestas ut.Eget in tellus, vitae tincidunt quam quis. Cursus faucibus integer mauris sagittis tellus scelerisque porttitor eget. Velit enim nec malesuada mauris pellentesque cras nullam convallis. Lectus netus quis nunc ac consequat fermentum, sem lectus. Lectus nam semper sollicitudin nisl elit. Et interdum felis et aenean. Nisl, bibendum eros arcu adipiscing etiam sagittis volutpat tempor dui. A neque eu massa fermentum adipiscing augue convallis quis turpis. Viverra amet eget donec dictumst varius. Est amet et nibh elementum tellus viverra.'",
}

export default {
  title: 'Technical components/Generic Modal',
  component: GenericModal,
  parameters: {
    docs: {
      description: {
        component: 'Generic modal component used for various modal modules',
      },
    },
  },
  argTypes,
}

const Template = (args, { argTypes }) => ({
  components: { GenericModal },
  props: Object.keys(argTypes),
  setup() {
    return { args }
  },
  template: `<div>
  <GenericModal>
    <h1>Hallo hier steht eine Komponente</h1>
    </GenericModal>
  </div>`,
})

export const Default = Template.bind({})
Default.args = {}
