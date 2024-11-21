<template>
    <div v-if="!items">Please bind variable</div>
    <draggable
        v-else
        tag="transition-group"
        v-model="items"
        :group="group"
        :item-key="itemKey"
        :animation="200"
        ghost-class="ghost"
        :disabled="isEditing"
        :component-data="{ tag: 'ul', name: 'flip-list', type: 'transition' }"
    >
        <template #item="{ element, index }">
            <div>
                <wwLayoutItemContext :index="index" :item="{}" is-repeat :data="element">
                    <wwLayout path="itemContent"></wwLayout>
                </wwLayoutItemContext>
            </div>
        </template>
    </draggable>
</template>

<script>
import draggable from "vuedraggable";
import { ref } from "vue";

export default {
    components: {
        draggable,
    },
    props: {
        content: { type: Object, required: true },
        wwElementState: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    emits: ["update:content", "update:content:effect", "trigger-event", "element-event"],
    setup() {
        return { internalGroup: wwLib.wwUtils.getUid(), items: ref([]) };
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        items: {
            get() {
                if (!this.content.variableId && !(this.wwElementState.props && this.wwElementState.props.items)) {
                    return null;
                }
                const data =
                    (this.wwElementState.props && this.wwElementState.props.items) ||
                    wwLib.wwVariable.getValue(this.content.variableId);
                if (!Array.isArray(data)) {
                    return null;
                } else {
                    return data;
                }
            },
            set(items) {
                this.$emit("trigger-event", { name: "change", event: { value: items } });
                this.$emit("element-event", { name: "change", event: { value: items } });
                if (this.content.variableId) wwLib.wwVariable.updateValue(this.content.variableId, items);
            },
        },
        group() {
            return (this.wwElementState.props && this.wwElementState.props.group) || this.internalGroup;
        },
        itemKey() {
            return (this.wwElementState.props && this.wwElementState.props.itemKey) || this.content.itemKey;
        },
    },
};
</script>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}
.not-draggable {
    cursor: no-drop;
}
</style>