const isEmailLinkType = type => type === 'email'
const isStoryLinkType = type => type === 'story'
const isBrowser = () => process.client && window
const getQueryParams = () => isBrowser() ? window.location.search : ''
const isPreview = () => getQueryParams().includes('_storyblok')


export function render ({node, $storyblok, links, lang}) {
  console.log('ENTER link resolver')
  return 'https://www.pfeiffer-vacuum.com/de/'
}
