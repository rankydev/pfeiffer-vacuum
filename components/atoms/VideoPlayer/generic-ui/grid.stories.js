export default {
  title: 'Generic UI/ Grid',
  parameters: {
    docs: {
      description: {
        component:
          'https://tailwindcss.com/docs/grid-template-rows <br><br>' +
          'This is an example for the grid layout.<br>' +
          'We are using a <b>12 column grid on desktop, 8 column grid on tablet</b> and a <b>4 column grid on mobile</b>.<br>' +
          'The gutter sizes are <b>32px on desktop, 24px on tablet</b> and <b>16px on mobile</b>.<br><br>' +
          'The class <b>tw-grid-container</b> handles the grid columns for all screen sizes automatically.',
      },
      source: {
        code:
          '<div class="tw-grid-container">\n\n' +
          '// Fluid container that breaks out of the grid\n' +
          '// Must be padded into a wrapping container with tw-col-span-full\n' +
          ' <div class="tw-col-span-full">\n' +
          '  <div class="tw-container-fluid">.tw-container-fluid</div>\n' +
          ' </div>\n\n' +
          '// Desktop: 12 | Tablet: 8 | Mobile: 4\n' +
          ' <div class="tw-col-span-4 md:tw-col-span-8 lg:tw-col-span-12">.tw-col-span-12</div>\n\n' +
          '// Desktop: 6-6 | Tablet: 4-4 | Mobile: 2-2\n' +
          ' <div class="tw-col-span-2 md:tw-col-span-4 lg:tw-col-span-6">.tw-col-span-6</div>\n' +
          ' <div class="tw-col-span-2 md:tw-col-span-4 lg:tw-col-span-6">.tw-col-span-6</div>\n\n' +
          '// Desktop: 4-4-4 | Tablet: 3-2-3 | Mobile: 2-2-4\n' +
          ' <div class="tw-col-span-2 md:tw-col-span-3 lg:tw-col-span-4">.tw-col-span-4</div>\n' +
          ' <div class="tw-col-span-2 md:tw-col-span-2 lg:tw-col-span-4">.tw-col-span-4</div>\n' +
          ' <div class="tw-col-span-4 md:tw-col-span-3 lg:tw-col-span-4">.tw-col-span-4</div>\n\n' +
          '// Desktop: 3-3-3-3 | Tablet: 2-2-2-2 | Mobile: 1-1-1-1\n' +
          ' <div class="tw-col-span-1 md:tw-col-span-2 lg:tw-col-span-3">.tw-col-span-3</div>\n' +
          ' <div class="tw-col-span-1 md:tw-col-span-2 lg:tw-col-span-3">.tw-col-span-3</div>\n' +
          ' <div class="tw-col-span-1 md:tw-col-span-2 lg:tw-col-span-3">.tw-col-span-3</div>\n' +
          ' <div class="tw-col-span-1 md:tw-col-span-2 lg:tw-col-span-3">.tw-col-span-3</div>\n\n' +
          '// Desktop: 8-4 | Tablet: 5-3 | Mobile: 3-1\n' +
          ' <div class="tw-col-span-3 md:tw-col-span-5 lg:tw-col-span-8">.tw-col-span-8</div>\n' +
          ' <div class="tw-col-span-1 md:tw-col-span-3 lg:tw-col-span-4">.tw-col-span-4</div>\n\n' +
          '// Desktop: 2-8-2 | Tablet: 2-4-2 | Mobile: 1-2-1\n' +
          ' <div class="tw-col-span-1 md:tw-col-span-2 lg:tw-col-span-2">.tw-col-span-2</div>\n' +
          ' <div class="tw-col-span-2 md:tw-col-span-4 lg:tw-col-span-8">.tw-col-span-8</div>\n' +
          ' <div class="tw-col-span-1 md:tw-col-span-2 lg:tw-col-span-2">.tw-col-span-2</div>\n\n' +
          '</div>',
      },
    },
  },
}

const defaultClasses = 'tw-p-3 tw-text-center tw-font-bold tw-rounded'

export const GridLayout = (args) => ({
  template: `
  <div class="tw-grid-container tw-p-1 md:tw-p-6 tw-text-white">
    <div class="tw-col-span-full">
        <div class="${defaultClasses} tw-bg-pv-red-darker tw-container-fluid">.tw-container-fluid</div>
    </div>

    <div class="${defaultClasses} tw-bg-pv-red-lighter tw-col-span-4 md:tw-col-span-8 lg:tw-col-span-12">.tw-col-span-12</div>

    <div class="${defaultClasses} tw-bg-pv-red-darker tw-col-span-2 md:tw-col-span-4 lg:tw-col-span-6">.tw-col-span-6</div>
    <div class="${defaultClasses} tw-bg-pv-red-darker tw-col-span-2 md:tw-col-span-4 lg:tw-col-span-6">.tw-col-span-6</div>

    <div class="${defaultClasses} tw-bg-pv-red-lighter tw-col-span-2 md:tw-col-span-3 lg:tw-col-span-4">.tw-col-span-4</div>
    <div class="${defaultClasses} tw-bg-pv-red-lighter tw-col-span-2 md:tw-col-span-2 lg:tw-col-span-4">.tw-col-span-4</div>
    <div class="${defaultClasses} tw-bg-pv-red-lighter tw-col-span-4 md:tw-col-span-3 lg:tw-col-span-4">.tw-col-span-4</div>

    <div class="${defaultClasses} tw-bg-pv-red-darker tw-col-span-1 md:tw-col-span-2 lg:tw-col-span-3">.tw-col-span-3</div>
    <div class="${defaultClasses} tw-bg-pv-red-darker tw-col-span-1 md:tw-col-span-2 lg:tw-col-span-3">.tw-col-span-3</div>
    <div class="${defaultClasses} tw-bg-pv-red-darker tw-col-span-1 md:tw-col-span-2 lg:tw-col-span-3">.tw-col-span-3</div>
    <div class="${defaultClasses} tw-bg-pv-red-darker tw-col-span-1 md:tw-col-span-2 lg:tw-col-span-3">.tw-col-span-3</div>

    <div class="${defaultClasses} tw-bg-pv-red-lighter tw-col-span-3 md:tw-col-span-5 lg:tw-col-span-8">.tw-col-span-8</div>
    <div class="${defaultClasses} tw-bg-pv-red-lighter tw-col-span-1 md:tw-col-span-3 lg:tw-col-span-4">.tw-col-span-4</div>

    <div class="${defaultClasses} tw-bg-pv-red-lighter tw-col-span-1 md:tw-col-span-3 lg:tw-col-span-10 tw-col-start-2">.SALAMI</div>

    <div class="${defaultClasses} tw-bg-pv-red-darker tw-col-span-1 md:tw-col-span-2 lg:tw-col-span-2">.tw-col-span-2</div>
    <div class="${defaultClasses} tw-bg-pv-red-darker tw-col-span-2 md:tw-col-span-4 lg:tw-col-span-8">.tw-col-span-8</div>
    <div class="${defaultClasses} tw-bg-pv-red-darker tw-col-span-1 md:tw-col-span-2 lg:tw-col-span-2">.tw-col-span-2</div>

    <div class="${defaultClasses} tw-bg-pv-red-darker tw-col-span-2 tw-col-start-2 md:tw-col-span-4 md:tw-col-start-3 lg:tw-col-span-10 lg:tw-col-start-2">.tw-col-span-8</div>
    </div>
  `,
})
