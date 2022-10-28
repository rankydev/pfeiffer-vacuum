export default {
  content: {
    component: 'Richtext',
    richtext: `<p>Plain text can be added <u>also with underline</u> or <strong>strong</strong> and links can either be
                <a href="https://www.pfeiffer-vacuum.com" target="_blank">external</a> or
                <a href="/home" target="_self">internal</a> or
                <a href="mailto:info@pfeiffer-vacuum.com">eMail links</a> or
                <a href="tel:+49123456789">telephone</a> or
                <a href="#anchor">anchor</a>
                 also styles for several headlines are provide like
                <h2>Headline H2</h2>
                <p><span class="tw-subline-2">Subline H2</span></p>
                <h3>Headline H3</h3>
                <p><span class="tw-subline-3">Subline H3</span></p>
                <h4>Headline H4</h4>
                <p><span class="tw-subline-4">Subline H4</span></p>
                <h5>Headline H5</h5>
                <p><span class="tw-subline-5">Subline H5</span></p>
                <h6>Headline H6</h6>
                <p><span class="tw-subline-6">Subline H6</span></p>
                <p>We have an unordered list:</p>
                <ul>
                  <li>aliquyam<sup>1</sup></li>
                  <li>erat</li>
                  <li>sed<sub>3</sub></li>
                  <li>diam</li>
                  <li>voluptua</li>
                </ul>
                <p>Also we have an ordered list:</p>
                <ol>
                  <li>aliquyam<sup>1</sup></li>
                  <li>erat</li>
                  <li>sed<sub>3</sub></li>
                  <li>diam</li>
                  <li>voluptua</li>
                </ol>
                aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>`,
  },
}

export const headlines = `
  <h2>Heading 2</h2>
  <p><span class="tw-subline tw-subline-2">Subheading 2</span></p>
  <h3>Heading 3</h3>
  <p><span class="tw-subline tw-subline-3">Subheading 3</span></p>
  <h2>Heading 4</h2>
  <p><span class="tw-subline tw-subline-4">Subheading 4</span></p>
  <h3>Heading 5</h3>
  <p><span class="tw-subline tw-subline-5">Subheading 5</span></p>
  <h2>Heading 6</h2>
  <p><span class="tw-subline tw-subline-6">Subheading 6</span></p>
`

export const styleOptions = `
<span class="superscript">amet</span>
<span class="subscript">consectetur </span>
`

export const linksTargetSelf = `
<a class="link-external" href="https://google.com/" target="_self" linktype="url">External</a>
<a class="link-internal" href="/default/" uuid="c0b766d9-bf1d-4a06-a3cb-b9f0e8d39125" anchor="" linktype="story">Internal</a>
<a class="link-anchor" href="/default/" uuid="c0b766d9-bf1d-4a06-a3cb-b9f0e8d39125" anchor="testAnchor" linktype="story">Anchor</a>
<a class="link-mail" href="mailto:test@test.com" linktype="email">Mail</a>
<a class="link-asset" href="https://a.storyblok.com/f/144293/329x153/4c312abe67/asset.png" target="_self" linktype="asset">Asset</a>`

export const linksTargetBlank = `
<a class="link-external" href="https://google.com/" target="_blank" linktype="url">External</a>
<a class="link-internal" href="/default/" uuid="c0b766d9-bf1d-4a06-a3cb-b9f0e8d39125" target="_blank" anchor="" linktype="story">Internal</a>
<a class="link-anchor" href="/default/" uuid="c0b766d9-bf1d-4a06-a3cb-b9f0e8d39125" target="_blank" anchor="testAnchor" linktype="story">Anchor</a>
<a class="link-mail" href="mailto:test@test.com" linktype="email" target="_blank">Mail</a>
<a class="link-asset" href="https://a.storyblok.com/f/144293/329x153/4c312abe67/asset.png" target="_blank" linktype="asset">Asset</a>`

export const unorderedList = `
<ul>
    <li><p>list unordered 1</p></li>
    <li><p>list unordered 2</p></li>
    <li><p>list unordered 3</p>
        <ul>
            <li><p>list unordered 3</p>
                <ul>
                    <li><p>list unordered 3</p>
                        <ul>
                            <li><p>list unordered 3</p></li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </li>
</ul>`

export const orderedList = `
<ol>
    <li><p>blubbb</p></li>
    <li><p>wdwdwdwd</p>
        <ol>
            <li><p>blubbb</p></li>
            <li><p>wdwdwdwd</p>
                <ol>
                    <li><p>blubbb</p></li>
                    <li><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
                        et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                        sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                        sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                        aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                        rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
                        amet.</p></li>
                </ol>
            </li>
        </ol>
    </li>
</ol>`

export const smallText = {
  richtext:
    '<p><b>Lorem ipsum dolor sit amet, consectetur adipiscing elit</b><br />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est velit pharetra tincidunt rhoncus, sed</p>',
  component: 'Richtext',
  uiComponent: 'Richtext',
}

export const newsletterText = {
  richtext:
    '<p>Sie möchten über aktuelle News von Pfeiffer Vacuum informiert werden? Dann abonnieren Sie unseren Newsletter.</p>',
  component: 'Richtext',
  uiComponent: 'Richtext',
}
