export default {
  title: 'Generic UI/ Typography',
  parameters: {
    docs: {
      description: {
        component:
          'This is a listing of all global configured typography styles.<br>' +
          'The example texts are <b>responsive</b>, so they change to smaller size and line height on tablet/phone.<br>' +
          'Default text color for this styles is *pv-grey-16* (#292929), with the class <b>"tw-text-inverse"</b> the text color can be inverted to *white* (#ffffff)',
      },
    },
  },
}

export const BlackAndWhite = () => ({
  template: `
      <div class="documentation-preview tw-p-8">
        <div class="tw-mb-6">
          <span class="tw-hero">Hero</span>
        </div>
        <div class="tw-mb-6">
          <h1>Headline 1</h1>
          <span class="tw-subline-1">Subline 1</span>
        </div>
        <div class="tw-mb-6">
          <h2>Headline 2</h2>
          <span class="tw-subline-2">Subline 2</span>
        </div>
        <div class="tw-mb-6">
          <h3>Headline 3</h3>
          <span class="tw-subline-3">Subline 3</span>
        </div>
        <div class="tw-mb-6">
          <h4>Headline 4</h4>
          <span class="tw-subline-4">Subline 4</span>
        </div>
        <div class="tw-mb-6">
          <h5>Headline 5</h5>
          <span class="tw-subline-5">Subline 5</span>
        </div>
        <div class="tw-mb-6">
          <h6>Headline 6</h6>
          <span class="tw-subline-6">Subline 6</span>
        </div>
        <div class="tw-mb-6">
          <span class="tw-main-nav">Main Navigation</span><br>
          <span class="tw-sub-nav">Sub Navigation</span>
        </div>
        <div class="tw-mb-6">
          <span class="tw-teaser tw-font-bold">Teaser/Bold</span><br>
          <span class="tw-teaser">Teaser/Regular</span>
        </div>
        <div class="tw-mb-6">
          <p class="tw-font-bold">Paragraph/Bold: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.</p>
          <p>Paragraph/Regular: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.</p>
        </div>
        <div class="tw-mb-6">
          <button>Button</button>
        </div>
      </div>
    `,
})

export const BlackAndLightGrey = () => ({
  template: `
      <div class="documentation-preview tw-p-8 tw-bg-pv-grey-96">
        <div class="tw-mb-6">
          <span class="tw-hero">Hero</span>
        </div>
        <div class="tw-mb-6">
          <h1>Headline 1</h1>
          <span class="tw-subline-1">Subline 1</span>
        </div>
        <div class="tw-mb-6">
          <h2>Headline 2</h2>
          <span class="tw-subline-2">Subline 2</span>
        </div>
        <div class="tw-mb-6">
          <h3>Headline 3</h3>
          <span class="tw-subline-3">Subline 3</span>
        </div>
        <div class="tw-mb-6">
          <h4>Headline 4</h4>
          <span class="tw-subline-4">Subline 4</span>
        </div>
        <div class="tw-mb-6">
          <h5>Headline 5</h5>
          <span class="tw-subline-5">Subline 5</span>
        </div>
        <div class="tw-mb-6">
          <h6>Headline 6</h6>
          <span class="tw-subline-6">Subline 6</span>
        </div>
        <div class="tw-mb-6">
          <span class="tw-main-nav">Main Navigation</span><br>
          <span class="tw-sub-nav">Sub Navigation</span>
        </div>
        <div class="tw-mb-6">
          <span class="tw-teaser tw-font-bold">Teaser/Bold</span><br>
          <span class="tw-teaser">Teaser/Regular</span>
        </div>
        <div class="tw-mb-6">
          <p class="tw-font-bold">Paragraph/Bold: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.</p>
          <p>Paragraph/Regular: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.</p>
        </div>
        <div class="tw-mb-6">
          <button>Button</button>
        </div>
      </div>
    `,
})

export const WhiteAndDarkGrey = () => ({
  template: `
      <div class="documentation-preview tw-p-8 tw-bg-pv-grey-16">
        <div class="tw-mb-6">
          <span class="tw-hero tw-text-inverse">Hero</span>
        </div>
        <div class="tw-mb-6">
          <h1 class="tw-text-inverse">Headline 1</h1>
          <span class="tw-subline-1 tw-text-inverse">Subline 1</span>
        </div>
        <div class="tw-mb-6">
          <h2 class="tw-text-inverse">Headline 2</h2>
          <span class="tw-subline-2 tw-text-inverse">Subline 2</span>
        </div>
        <div class="tw-mb-6">
          <h3 class="tw-text-inverse">Headline 3</h3>
          <span class="tw-subline-3 tw-text-inverse">Subline 3</span>
        </div>
        <div class="tw-mb-6">
          <h4 class="tw-text-inverse">Headline 4</h4>
          <span class="tw-subline-4 tw-text-inverse">Subline 4</span>
        </div>
        <div class="tw-mb-6">
          <h5 class="tw-text-inverse">Headline 5</h5>
          <span class="tw-subline-5 tw-text-inverse">Subline 5</span>
        </div>
        <div class="tw-mb-6">
          <h6 class="tw-text-inverse">Headline 6</h6>
          <span class="tw-subline-6 tw-text-inverse">Subline 6</span>
        </div>
        <div class="tw-mb-6">
          <span class="tw-main-nav tw-text-inverse">Main Navigation</span><br>
          <span class="tw-sub-nav tw-text-inverse">Sub Navigation</span>
        </div>
        <div class="tw-mb-6">
          <span class="tw-teaser tw-font-bold tw-text-inverse">Teaser/Bold</span><br>
          <span class="tw-teaser tw-text-inverse">Teaser/Regular</span>
        </div>
        <div class="tw-mb-6">
          <p class="tw-font-bold tw-text-inverse">Paragraph/Bold: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.</p>
          <p class="tw-text-inverse">Paragraph/Regular: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.</p>
        </div>
        <div class="tw-mb-6">
          <button class="tw-text-inverse">Button</button>
        </div>
      </div>
    `,
})

export const WhiteAndRed = () => ({
  template: `
      <div class="documentation-preview tw-p-8 tw-bg-pv-red">
        <div class="tw-mb-6">
          <span class="tw-hero tw-text-inverse">Hero</span>
        </div>
        <div class="tw-mb-6">
          <h1 class="tw-text-inverse">Headline 1</h1>
          <span class="tw-subline-1 tw-text-inverse">Subline 1</span>
        </div>
        <div class="tw-mb-6">
          <h2 class="tw-text-inverse">Headline 2</h2>
          <span class="tw-subline-2 tw-text-inverse">Subline 2</span>
        </div>
        <div class="tw-mb-6">
          <h3 class="tw-text-inverse">Headline 3</h3>
          <span class="tw-subline-3 tw-text-inverse">Subline 3</span>
        </div>
        <div class="tw-mb-6">
          <h4 class="tw-text-inverse">Headline 4</h4>
          <span class="tw-subline-4 tw-text-inverse">Subline 4</span>
        </div>
        <div class="tw-mb-6">
          <h5 class="tw-text-inverse">Headline 5</h5>
          <span class="tw-subline-5 tw-text-inverse">Subline 5</span>
        </div>
        <div class="tw-mb-6">
          <h6 class="tw-text-inverse">Headline 6</h6>
          <span class="tw-subline-6 tw-text-inverse">Subline 6</span>
        </div>
        <div class="tw-mb-6">
          <span class="tw-main-nav tw-text-inverse">Main Navigation</span><br>
          <span class="tw-sub-nav tw-text-inverse">Sub Navigation</span>
        </div>
        <div class="tw-mb-6">
          <span class="tw-teaser tw-font-bold tw-text-inverse">Teaser/Bold</span><br>
          <span class="tw-teaser tw-text-inverse">Teaser/Regular</span>
        </div>
        <div class="tw-mb-6">
          <p class="tw-font-bold tw-text-inverse">Paragraph/Bold: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.</p>
          <p class="tw-text-inverse">Paragraph/Regular: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.</p>
        </div>
        <div class="tw-mb-6">
          <button class="tw-text-inverse">Button</button>
        </div>
      </div>
    `,
})
