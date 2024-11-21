

<template>
    <draggable
        v-model="items"
        :itemKey="getItemKey"
        :disabled="isEditing"
        :animation="200"
        :style="{ ...$attrs.style, ...layoutStyle }"
        v-bind="options"
        group="tasks"
        ghost-class="ghost"
    >
        <template #item="{ element, index }">
            <div class="draggable-item">
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
        console.log("Setup function called");
        return { layoutStyle: wwLib.useLayoutStyle() };
    },
    computed: {
        items: {
            get() {
                console.log("Getting items from collection data");
                return wwLib.wwCollection.getCollectionData(this.content.data) || [];
            },
            set(value) {
                console.log("Setting items with value:", value);
                this.$emit("trigger-event", { name: "update:list", event: { value } });
            },
        },
        isEditing() {
            console.log("Checking if editor is in editing state");
            return this.wwEditorState?.isEditing;
        },
        options() {
            console.log("Generating options for draggable component");
            const options = {};
            if (this.content.handle?.length) {
                options.handle = `.${this.content.handle}`;
                console.log("Handle option set to:", options.handle);
            }
            if (this.content.group) {
                options.group = this.content.group;
                console.log("Group option set to:", options.group);
            }
            options.forceFallback = true; // Enforcing fallback for better touch support
            return options;
        },
    },
    methods: {
        getItemKey(item) {
            console.log("Getting item key for item:", item);
            return wwLib.resolveObjectPropertyPath(item, this.content.idPath || "id");
        },
        /* wwEditor:start */
        getTestEvent() {
            console.log("Getting test event data");
            const data = wwLib.wwCollection.getCollectionData(this.content.data);
            console.log("Test event data:", data);
            return {
                value: data,
            };
        },
        /* wwEditor:end */
    },
};
</script>

<style>
.ghost {
    opacity: 0.5;
    background: #F7FAFC;
    border: 1px solid #4299e1;
    min-height: 50px;
}

.draggable-item {
    position: relative;
}
</style>
