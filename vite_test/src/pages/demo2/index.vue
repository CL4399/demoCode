<template>
    <SelectionArea class="container green" :options="{ selectables: '.selectable' }" :on-move="onMove"
        :on-start="onStart">
        <div v-for="id of range(51)" :key="id" :data-key="id" class="selectable"
            :class="{ selected: selected.has(id) }" />
    </SelectionArea>
    <button @click="check">查看选择的</button>
</template>

<script lang="ts">
import SelectionArea, { SelectionEvent } from '@viselect/vue';
import { computed, defineComponent, ref, reactive, watch, onMounted } from 'vue'
export default defineComponent({
    name: 'channelControl',
    components: { SelectionArea },
    setup() {
        const selected = ref(new Set())
        const check = () => {
            console.log(selected.value)
        }
        function extractIds(els: Element[]): number[] {
            return els.map(v => v.getAttribute('data-key'))
                .filter(Boolean)
                .map(Number);
        }
        const onStart = ({ event, selection }: SelectionEvent) => {
            if (!event?.ctrlKey && !event?.metaKey) {
                // selection.clearSelection();
                // selected.value.clear()
            }
        }
        const onMove = ({ store: { changed: { added, removed } } }: SelectionEvent) => {
            extractIds(added).forEach(id => selected.value.add(id));
            extractIds(removed).forEach(id => selected.value.delete(id));
        }
        const range = (to: number, offset = 0): number[] => {
            return new Array(to).fill(0).map((_, i) => offset + i);
        }
        return {
            selected,
            check,
            onStart,
            onMove,
            range
        }
    }

})








</script>
<style>
.container {
    user-select: none;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
}

.selection-area {
    background: rgba(46, 115, 252, 0.11);
    border: 2px solid rgba(98, 155, 255, 0.81);
    border-radius: 0.1em;
}



.selectable {
    width: 100px;
    height: 100px;
    background-color: blanchedalmond;
    margin-right: 10px;
    margin-bottom: 10px;
}

.selected {
    border: 2px solid rgba(98, 155, 255, 0.81);
    background: #d1e5fb;
    box-sizing: border-box;
}
</style>