<template>
    <draggable
        v-model="items"
        :itemKey="getItemKey"
        :disabled="isEditing"
        :animation="200"
        :style="{ ...$attrs.style, ...layoutStyle }"
        v-bind="options"
    >
        <template #item="{ element, index }">
            <div>
                <wwLayoutItemContext is-repeat :data="element" :item="null" :index="index">
                    <wwElement v-bind="content.itemContainer" />
                </wwLayoutItemContext>
            </div>
        </template>
    </draggable>
</template>

<script>
import draggable from "vuedraggable";

export default {
    components: { draggable },
    props: {
        content: { type: Object, required: true },
        wwEditorState: { type: Object, default: null },
    },
    emits: ["trigger-event"],
    setup() {
        provide('customHandler', (change, {stack: stackValue, updatedStackItems}) => {
      if (change.moved) {
        emit('trigger-event', { 
          name: 'item:moved', 
          event: { 
            item: change.moved.element,
            from: stackValue,
            to: stackValue,
            oldIndex: change.moved.oldIndex,
            newIndex: change.moved.newIndex,
            updatedList: updatedStackItems
          }
        })
      }

      if (change.added) {
        emit('trigger-event', {
          name: 'item:moved',
          event: {
            item: change.added.element,
            from: wwLib.resolveObjectPropertyPath(change.added.element, props.content.stackedBy),
            to: stackValue,
            oldIndex: null,
            newIndex: change.added.newIndex,
            updatedList: updatedStackItems
          }
        })
      }
    })



        return { layoutStyle: wwLib.useLayoutStyle() };
    },
    computed: {
        items: {
            get() {
                return wwLib.wwCollection.getCollectionData(this.content.data) || [];
            },
            set(value) {
                this.$emit("trigger-event", { name: "update:list", event: { value } });
            },
        },
        isEditing() {
            return this.wwEditorState?.isEditing;
        },
        options() {
            const options = {};
            if (this.content.handle?.length) {
                options.handle = `.${this.content.handle}`;
            }
            if (this.content.group) {
                options.group = this.content.group;
            }

            return options;
        },
    },
    methods: {
        getItemKey(item) {
            wwLib.resolveObjectPropertyPath(item, this.content.idPath || "id");
        },
        /* wwEditor:start */
        getTestEvent() {
            const data = wwLib.wwCollection.getCollectionData(this.content.data);
            return {
                value: data,
            };
        },
        /* wwEditor:end */
    },
};
</script>