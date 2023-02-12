import sanitizeHtml from 'sanitize-html'

const baseConfig = {
  disallowedTagsMode: 'discard',
  allowedSchemes: ['http', 'https', 'mailto'],
  allowedSchemesByTag: {},
  allowedSchemesAppliedToAttributes: ['href', 'src', 'cite'],
  allowProtocolRelative: true,
  allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],
}

const sanitizerConfig = {
  clear: { allowedTags: [], selfClosing: [], allowedAttributes: {} },
  inline: {
    allowedTags: [
      'a',
      'b',
      'i',
      'em',
      'strong',
      'span',
      'small',
      'big',
      'sub',
      'sup',
      'hit',
      'concept',
    ],
    selfClosing: [],
    allowedAttributes: {
      '*': ['class', 'style', 'href', 'target'],
    },
  },
  block: {
    extends: 'inline',
    allowedTags: [
      'a',
      'address',
      'blockquote',
      'p',
      'div',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'pre',
      'hr',
      'dl',
      'dt',
      'dd',
      'br',
      'hr',
    ],
    selfClosing: ['br', 'hr'],
    allowedAttributes: {
      a: ['href', 'name', 'target'],
    },
  },
  media: {
    extends: 'block',
    allowedTags: ['iframe', 'audio', 'video', 'source', 'track', 'img', 'meta'],
    selfClosing: ['img', 'source', 'track'],
    allowedAttributes: {
      iframe: [
        'src',
        'width',
        'height',
        'allowfullscreen',
        'allow',
        'frameborder',
      ],
      audio: ['src', 'autoplay', 'controls', 'loop', 'muted', 'preload'],
      video: [
        'src',
        'width',
        'height',
        'autoplay',
        'controls',
        'loop',
        'muted',
        'poster',
        'preload',
      ],
      source: ['src', 'srcset', 'media', 'sizes', 'type'],
      track: ['src', 'srclang', 'default', 'kind', 'label'],
      img: ['src', 'alt'],
    },
  },
}

function getConfig(type) {
  const config = { ...baseConfig, ...sanitizerConfig[type] }

  if (config.extends) {
    const parentConfig = getConfig(config.extends)

    config.allowedTags = parentConfig.allowedTags.concat(config.allowedTags)
    config.selfClosing = parentConfig.selfClosing.concat(config.selfClosing)
    config.allowedAttributes = {
      ...parentConfig.allowedAttributes,
      ...config.allowedAttributes,
    }
  }

  return config
}

export const useSanitizer = () => {
  const functions = {}

  for (const type in sanitizerConfig) {
    functions[type] = function (dirty) {
      return sanitizeHtml(dirty, getConfig(type))
    }
  }

  return functions
}
