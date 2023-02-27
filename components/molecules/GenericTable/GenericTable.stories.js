import GenericTable from './GenericTable'
import {
  header,
  tableData,
  tableDataCarousel,
} from './GenericTable.stories.content.js'

const argTypes = {}

export default {
  title: 'Technical Components/Generic Table',
  component: GenericTable,
  parameters: {
    docs: {
      description: {
        component:
          'This is a generic table component. It can be filled with header information and data entries. <br/>' +
          'The sortable functionality is activated by default for all header entries, it can be disabled by passing sortable: false; - clicking the header entry for sorting triggers an emit with active sorting method and array entry ID.<br/>' +
          'All entries can have a normal text and an optional marginal text. <br/>' +
          'The data array accepts beside the row entries an actions array, in which buttons can be defined. (displayed at the end of a row)',
      },
      source: {
        code: '<GenericTable v-bind="{ header, tableData }"  />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { GenericTable },
  setup() {
    const logSorting = (e) => {
      alert(`ID: ${e.id}, State: ${e.state}`)
    }
    return { args, logSorting }
  },
  template: `
  <div class="documentation-preview">
    <GenericTable v-bind="args" @sortingChanged="logSorting" />
  </div>
`,
})

const CarouselTemplate = (args) => ({
  components: { GenericTable },
  setup() {
    const logSorting = (e) => {
      alert(`ID: ${e.id}, State: ${e.state}`)
    }
    return { args, logSorting }
  },
  template: `
  <div class="documentation-preview">
    <GenericTable v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  header,
  tableData,
}

export const TableCardCarousel = CarouselTemplate.bind({})
TableCardCarousel.args = {
  tableData: tableDataCarousel,
  carousel: true,
}
