export default {
  editor: {
      label: {
          en: "Draggable List",
      },
  },
  properties: {
      variableId: {
          label: 'Associated variable',
          type: 'Variable',
          options: {
              types: ['Array']
          }
      },
      itemKey: {
          label: 'Item key',
          type: 'Text',
          defaultValue: 'id',
      },
      itemContent: {
          hidden: true,
      },
  },
};