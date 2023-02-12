export const normalData = {
  optionLabel: 'label',
  optionsKey: 'concepts',
  options: [
    {
      label: 'Node 1',
      concepts: [
        {
          label: 'Child Node 1',
          concepts: [
            { label: 'Child Node 1.1' },
            {
              label: 'Child Node 1.2',
              concepts: [
                { label: 'Child Node 1.2.1' },
                { label: 'Child Node 1.2.2' },
                { label: 'Child Node 1.2.3' },
              ],
            },
            { label: 'Child Node 1.3' },
          ],
        },
        { label: 'Child Node 2' },
      ],
    },
    {
      label: 'Node 2',
      concepts: [{ label: 'Child Node 3' }, { label: 'Child Node 4' }],
    },
    { label: 'Node 3' },
  ],
}

export default {}
