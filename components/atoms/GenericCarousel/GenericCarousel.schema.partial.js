export default {
  isWide: {
    type: 'boolean',
    display_name: 'Wide Carousel',
    description:
      'Let the carousel span over the full width of the page and let it break out of the usual content grid',
  },
  autoplay: {
    type: 'boolean',
    display_name: 'Autoplay',
    description: 'Enables autoplay on carousel',
  },
  autoplaySpeed: {
    type: 'number',
    display_name: 'Autoplay speed',
    description: 'Autoplay speed in seconds',
    default_value: 5,
  },
  infinite: {
    type: 'boolean',
    display_name: 'Infinite',
    description: 'Enables infinite wrap around slides on carousel',
  },
}
