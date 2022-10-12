export const facets = [
  {
    category: false,
    code: '3912',
    facetType: 'RANGESLIDERBOUND',
    multiSelect: false,
    name: 'Vacuum range min',
    priority: 99,
    values: [
      {
        count: 1,
        name: '1.0E-7',
        query: {
          query: {
            filterTerms: [
              {
                key: '3913',
                value: '>=2500',
              },
              {
                key: '3912',
                value: '1.0E-7',
              },
            ],
            value: ':name-asc:3913:%3E%3D2500:3912:1.0E-7',
          },
        },
        selected: false,
      },
    ],
    visible: true,
  },
  {
    category: false,
    code: '3913',
    facetType: 'RANGESLIDERBOUND',
    multiSelect: false,
    name: 'Vacuum range max',
    priority: 99,
    values: [
      {
        count: 1,
        name: '2500.0',
        query: {
          query: {
            filterTerms: [
              {
                key: '3913',
                value: '>=2500',
              },
              {
                key: '3913',
                value: '2500.0',
              },
            ],
            value: ':name-asc:3913:%3E%3D2500:3913:2500.0',
          },
        },
        selected: false,
      },
      {
        count: 1,
        name: '3000.0',
        query: {
          query: {
            filterTerms: [
              {
                key: '3913',
                value: '>=2500',
              },
              {
                key: '3913',
                value: '3000.0',
              },
            ],
            value: ':name-asc:3913:%3E%3D2500:3913:3000.0',
          },
        },
        selected: false,
      },
    ],
    visible: true,
  },
  {
    category: false,
    code: '3795',
    facetType: 'MULTISELECTOR',
    multiSelect: true,
    name: 'Lorem ipsum dolor sit amet',
    priority: 91,
    values: [
      {
        count: 2,
        name: 'ISO-KF',
        query: {
          query: {
            filterTerms: [
              {
                key: '3795',
                value: 'ISO-KF',
              },
            ],
            value: ':name-asc:3795:ISO-KF',
          },
        },
        selected: true,
      },
    ],
    visible: true,
  },
  {
    category: false,
    code: '3796',
    facetType: 'MULTISELECTOR',
    multiSelect: true,
    name: 'Lorem ipsum',
    priority: 91,
    values: [
      {
        count: 1,
        name: 'DN 10',
        query: {
          query: {
            filterTerms: [
              {
                key: '3795',
                value: 'ISO-KF',
              },
            ],
            value: ':name-asc:3795:ISO-KF',
          },
        },
        selected: false,
      },
      {
        count: 1,
        name: 'DN 16',
        query: {
          query: {
            filterTerms: [
              {
                key: '3795',
                value: 'ISO-KF',
              },
            ],
            value: ':name-asc:3795:ISO-KF',
          },
        },
        selected: false,
      },
    ],
    visible: true,
  },
  {
    category: false,
    code: '3797',
    facetType: 'MULTISELECTOR',
    multiSelect: true,
    name: 'Lorem',
    priority: 91,
    values: [
      {
        count: 2,
        name: 'ISO-KF',
        query: {
          query: {
            filterTerms: [
              {
                key: '3795',
                value: 'ISO-KF',
              },
            ],
            value: ':name-asc:3795:ISO-KF',
          },
        },
        selected: false,
      },
    ],
    visible: true,
  },
  {
    category: false,
    code: '3798',
    facetType: 'MULTISELECTOR',
    multiSelect: true,
    name: 'Lorem ipsum dolor sit amet consetetur',
    priority: 91,
    values: [
      {
        count: 1,
        name: 'DN 10',
        query: {
          query: {
            filterTerms: [
              {
                key: '3795',
                value: 'ISO-KF',
              },
            ],
            value: ':name-asc:3795:ISO-KF',
          },
        },
        selected: false,
      },
      {
        count: 1,
        name: 'DN 16',
        query: {
          query: {
            filterTerms: [
              {
                key: '3795',
                value: 'ISO-KF',
              },
            ],
            value: ':name-asc:3795:ISO-KF',
          },
        },
        selected: false,
      },
    ],
    visible: true,
  },
  {
    category: false,
    code: '3799',
    facetType: 'MULTISELECTOR',
    multiSelect: true,
    name: 'Lorem',
    priority: 91,
    values: [
      {
        count: 2,
        name: 'ISO-KF lorem extra long value ipsum',
        query: {
          query: {
            filterTerms: [
              {
                key: '3795',
                value: 'ISO-KF',
              },
            ],
            value: ':name-asc:3795:ISO-KF',
          },
        },
        selected: false,
      },
    ],
    visible: true,
  },
  {
    category: false,
    code: '3800',
    facetType: 'MULTISELECTOR',
    multiSelect: true,
    name: 'Lorem ipsum dolor sit amet',
    priority: 91,
    values: [
      {
        count: 1,
        name: 'DN 10',
        query: {
          query: {
            filterTerms: [
              {
                key: '3795',
                value: 'ISO-KF',
              },
            ],
            value: ':name-asc:3795:ISO-KF',
          },
        },
        selected: false,
      },
      {
        count: 1,
        name: 'DN 16',
        query: {
          query: {
            filterTerms: [
              {
                key: '3795',
                value: 'ISO-KF',
              },
            ],
            value: ':name-asc:3795:ISO-KF',
          },
        },
        selected: false,
      },
    ],
    visible: true,
  },
]

export const sorts = [
  {
    code: 'relevance',
    name: 'Relevance',
    selected: false,
  },
  {
    code: 'name-asc',
    name: 'Name (ascending)',
    selected: true,
  },
  {
    code: 'name-desc',
    name: 'Name (descending)',
    selected: false,
  },
]

export const currentQuery = {
  query: {
    filterTerms: [
      {
        displayName: 'Lorem ipsum dolor sit amet',
        key: '3795',
        value: 'ISO-KF',
      },
    ],
    value: ':name-asc:3795:ISO-KF',
  },
}

export default { facets, sorts, currentQuery }
