export default {
  editor: {
      label: {
          en: "Draggable List",
      },
  },

  triggerEvents: [
    {
      name: "update:list",
      label: { en: "On List update" },
      event: { value: "" },
      getTestEvent: "getTestEvent",
      default: true,
    },
  ],
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