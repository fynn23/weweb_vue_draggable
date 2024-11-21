export default {
    options: {
      layout: ["flex"],
  
      // Erlaube bestimmte display-Eigenschaften für die Elemente
      displayAllowedValues: ['flex', 'block', 'inline-block', 'grid'],  // flex für Flexbox-Layouts hinzufügen
  
      // Ignoriere bestimmte Style-Properties, die in der WeWeb-Konfiguration nicht verwaltet werden sollen
      ignoredStyleProperties: ['overflow', 'background'],  // Ignoriere overflow und background, wenn es in der Komponente festgelegt wird
    },
  
    inherit: {
      type: "ww-layout",
    },
  
    editor: {
      label: {
        en: "Sortable list",
      },
      icon: "border",
      bubble: {
        icon: "border",
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
      // Neues Property für Flex-Richtung
      flexDirection: {
        label: { en: "Flex Direction" },
        type: "TextSelect",   // Ermöglicht die Auswahl von Werten im Editor
        options: {
          choices: [
            { value: 'row', label: { en: "Horizontal" } },
            { value: 'column', label: { en: "Vertical" } },
          ],
        },
        defaultValue: 'row',  // Standardwert auf 'row' setzen
      },
      data: {
        bindable: true,
        section: "settings",
        label: "Items",
        type: "Info",
        options: {
          text: { en: "Elements to repeat" },
        },
      },
      idPath: {
        label: {
          en: "Unique id",
        },
        type: "ObjectPropertyPath",
        options: (content) => ({
          object: getDataObject(content),
        }),
        hidden: (content) => !hasData(content),
        section: "settings",
      },
      handle: {
        label: "Handle class",
        type: "Text",
        section: "settings",
      },
      group: {
        label: "Group Id",
        type: "Text",
        section: "settings",
      },
      itemContainer: {
        hidden: true,
        defaultValue: {
          isWwObject: true,
          type: "ww-flexbox",
        },
      },
    },
  };
  
  // Hilfsfunktionen für Datenobjekte
  function getDataObject(content) {
    if (!content.data) return {};
    if (Array.isArray(content.data)) {
      return content.data[0] || {};
    }
    if (Array.isArray(content.data.data)) {
      return content.data.data[0] || {};
    }
    return {};
  }
  
  function hasData(content) {
    if (!content.data) return false;
    if (Array.isArray(content.data)) {
      return content.data.length;
    }
    if (Array.isArray(content.data.data)) {
      return content.data.data.length;
    }
    return false;
  }
  