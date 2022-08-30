export default {
  'tab-social': {
    type: 'tab',
    display_name: 'Social',
    keys: [
      'twitter',
      'twitterTitle',
      'twitterDescription',
      'twitterImage',
      'openGraph',
      'ogTitle',
      'ogDescription',
      'ogImage',
    ],
  },
  twitter: {
    type: 'section',
    keys: ['twitterTitle', 'twitterDescription', 'twitterImage'],
  },
  twitterTitle: {
    type: 'text',
    translatable: true,
    description:
      'The title of your content as it should appear in the card. [Maximum 70 characters.] If this field is empty the page title will be used.',
    max_length: '70',
    display_name: 'Title',
  },
  twitterDescription: {
    type: 'textarea',
    translatable: true,
    description:
      'A description that concisely summarizes the content as appropriate for presentation within a Tweet. You should not re-use the title as the description or use this field to describe the general services provided by the website. [Maximum 200 characters.] If this field is empty the seo description will be used.',
    max_length: '200',
    display_name: 'Description',
  },
  twitterImage: {
    type: 'asset',
    description:
      'A URL to a unique image representing the content of the page. You should not use a generic image such as your website logo, author photo, or other image that spans multiple pages. Images for this Card should be at least 280px in width, and at least 150px in height. Image must be less than 1MB in size. If there is no image set a fallback image will be used.',
    display_name: 'Image',
    filetypes: ['images'],
  },
  openGraph: {
    type: 'section',
    keys: ['ogTitle', 'ogDescription', 'ogImage'],
    display_name: 'Open Graph (Facebook)',
  },
  ogTitle: {
    type: 'text',
    translatable: true,
    display_name: 'Title',
    max_length: '60',
    description:
      'The title, headline or name of the object. If this field is empty the page title will be used.',
  },
  ogDescription: {
    type: 'textarea',
    display_name: 'Description',
    translatable: true,
    max_length: '200',
    description:
      'A short description or summary of the object. [Between 2 and 4 sentences.] If this field is empty the SEO description will be used.',
  },
  ogImage: {
    type: 'asset',
    display_name: 'Image',
    description:
      'The URL of the image for your object. It should be at least 600x315 pixels, but 1200x630 or larger is preferred (up to 5MB). Stay close to a 1.91:1 aspect ratio to avoid cropping. If there is no image set a fallback image will be used.',
    filetypes: ['images'],
  },
}
