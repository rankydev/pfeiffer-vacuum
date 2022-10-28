import { useSanitizer } from './useSanitizer'

const sut = useSanitizer()

const TEST_TEXT = 'Hello this is my text!'
const LINK_TEXT = 'My Link'
const MAILTO_LINK_TEXT = 'Contact us!'
const BUTTON_TEXT = 'Click Me'

const HTML_SPAN = '<span>' + TEST_TEXT + '</span>'
const HTML_STYLES =
  '<span class="span-class" style="color:#f00"><b>' + TEST_TEXT + '</b></span>'

const HTML_LINKS =
  '<a href="https://www.example.com/page?par1=val1&par2=val2" target="_blank">' +
  LINK_TEXT +
  '</a>'
const HTML_LINKS_RESULT =
  '<a href="https://www.example.com/page?par1=val1&amp;par2=val2" target="_blank">' +
  LINK_TEXT +
  '</a>'

const HTML_MAILTO_LINKS =
  '<a href="mailto:support@pfeiffer-vacuum.com?subject=Contact Pfeiffer">' +
  MAILTO_LINK_TEXT +
  '</a>'
const HTML_MAILTO_RESULT =
  '<a href="mailto:support@pfeiffer-vacuum.com?subject=Contact Pfeiffer">' +
  MAILTO_LINK_TEXT +
  '</a>'

const HTML_BLOCKS = '<div class="my-class">' + TEST_TEXT + '</div>'
const HTML_LISTS =
  '<ul class="my-list-class"><li class="element-class">' +
  TEST_TEXT +
  '</li></ul>'

const HTML_IMG =
  '<img src="https://my-page.com/my-image.jpg" alt="The alt text" class="image-class" />'
const HTML_AUDIO =
  '<audio controls="controls"><source src="//www.example.com/horse.mp3" type="audio/mpeg" /></audio>'
const HTML_VIDEO =
  '<video width="320" height="240" controls="controls"><source src="//www.example.com/forrest_gump.mp4" type="video/mp4" /><track src="//www.example.com/subtitles_en.vtt" kind="subtitles" srclang="en" label="English" /></video>'
const HTML_IFRAME =
  '<iframe src="//www.youtube.com/embed/asdf1234?rel=0&start=60" allow="autoplay; encrypted-media" allowfullscreen width="492" height="277" frameborder="0"></iframe>'
const HTML_IFRAME_RESULT =
  '<iframe src="//www.youtube.com/embed/asdf1234?rel=0&amp;start=60" allow="autoplay; encrypted-media" allowfullscreen width="492" height="277" frameborder="0"></iframe>'

const HTML_SCRIPT = "<script>alert('Hello from script!')</script>"
const HTML_BUTTON_SCRIPT =
  '<button onclick="alert(\'Hello from button!\')">' + BUTTON_TEXT + '</button>'

describe('html sanitizer', function () {
  test('clean', function () {
    // bypass
    expect(sut.clear(TEST_TEXT)).toBe(TEST_TEXT)

    // filtered
    expect(sut.clear(HTML_SPAN)).toBe(TEST_TEXT)
    expect(sut.clear(HTML_STYLES)).toBe(TEST_TEXT)
    expect(sut.clear(HTML_LINKS)).toBe(LINK_TEXT)
    expect(sut.clear(HTML_LINKS)).toBe(LINK_TEXT)
    expect(sut.clear(HTML_MAILTO_LINKS)).toBe(MAILTO_LINK_TEXT)
    expect(sut.clear(HTML_BLOCKS)).toBe(TEST_TEXT)
    expect(sut.clear(HTML_LISTS)).toBe(TEST_TEXT)
    expect(sut.clear(HTML_IMG)).toBe('')
    expect(sut.clear(HTML_AUDIO)).toBe('')
    expect(sut.clear(HTML_VIDEO)).toBe('')
    expect(sut.clear(HTML_IFRAME)).toBe('')
    expect(sut.clear(HTML_SCRIPT)).toBe('')
    expect(sut.clear(HTML_BUTTON_SCRIPT)).toBe(BUTTON_TEXT)
  })

  test('inline', function () {
    // bypass
    expect(sut.inline(TEST_TEXT)).toBe(TEST_TEXT)
    expect(sut.inline(HTML_SPAN)).toBe(HTML_SPAN)
    expect(sut.inline(HTML_STYLES)).toBe(HTML_STYLES)

    // filtered
    expect(sut.inline(HTML_LINKS)).toBe(LINK_TEXT)
    expect(sut.inline(HTML_MAILTO_LINKS)).toBe(MAILTO_LINK_TEXT)
    expect(sut.inline(HTML_BLOCKS)).toBe(TEST_TEXT)
    expect(sut.inline(HTML_LISTS)).toBe(TEST_TEXT)
    expect(sut.inline(HTML_IMG)).toBe('')
    expect(sut.inline(HTML_AUDIO)).toBe('')
    expect(sut.inline(HTML_VIDEO)).toBe('')
    expect(sut.inline(HTML_IFRAME)).toBe('')
    expect(sut.inline(HTML_SCRIPT)).toBe('')
    expect(sut.inline(HTML_BUTTON_SCRIPT)).toBe(BUTTON_TEXT)
  })

  test('block', function () {
    // bypass
    expect(sut.block(TEST_TEXT)).toBe(TEST_TEXT)
    expect(sut.block(HTML_SPAN)).toBe(HTML_SPAN)
    expect(sut.block(HTML_STYLES)).toBe(HTML_STYLES)
    expect(sut.block(HTML_BLOCKS)).toBe(HTML_BLOCKS)
    expect(sut.block(HTML_LISTS)).toBe(HTML_LISTS)
    expect(sut.block(HTML_LINKS)).toBe(HTML_LINKS_RESULT)
    expect(sut.block(HTML_MAILTO_LINKS)).toBe(HTML_MAILTO_RESULT)

    // filtered
    expect(sut.block(HTML_IMG)).toBe('')
    expect(sut.block(HTML_AUDIO)).toBe('')
    expect(sut.block(HTML_VIDEO)).toBe('')
    expect(sut.block(HTML_IFRAME)).toBe('')
    expect(sut.block(HTML_SCRIPT)).toBe('')
    expect(sut.block(HTML_BUTTON_SCRIPT)).toBe(BUTTON_TEXT)
  })

  test('media', function () {
    // bypass
    expect(sut.media(TEST_TEXT)).toBe(TEST_TEXT)
    expect(sut.media(HTML_SPAN)).toBe(HTML_SPAN)
    expect(sut.media(HTML_STYLES)).toBe(HTML_STYLES)
    expect(sut.media(HTML_LINKS)).toBe(HTML_LINKS_RESULT)
    expect(sut.media(HTML_MAILTO_LINKS)).toBe(HTML_MAILTO_RESULT)
    expect(sut.media(HTML_BLOCKS)).toBe(HTML_BLOCKS)
    expect(sut.media(HTML_LISTS)).toBe(HTML_LISTS)
    expect(sut.media(HTML_IMG)).toBe(HTML_IMG)
    expect(sut.media(HTML_AUDIO)).toBe(HTML_AUDIO)
    expect(sut.media(HTML_VIDEO)).toBe(HTML_VIDEO)
    expect(sut.media(HTML_IFRAME)).toBe(HTML_IFRAME_RESULT)

    // filtered
    expect(sut.media(HTML_SCRIPT)).toBe('')
    expect(sut.media(HTML_BUTTON_SCRIPT)).toBe(BUTTON_TEXT)
  })
})
