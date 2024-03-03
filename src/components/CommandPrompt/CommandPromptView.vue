<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { search } from 'fast-fuzzy';
import { mainItems } from './data.ts';
import PromptCard from './PromptCard.vue';
import type { PromptItem } from './types';
import { groupBy } from 'remeda';

const selected = ref<string | null>(mainItems[0]!.id);

const setSelected = (id: string): void => {
    selected.value = id;
};

const defaultGroupedItems = ref(groupBy(mainItems, (x) => x.group));

const cmd = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

const filteredGroups = computed(() => {
    if (cmd.value.trim() === '') {
        return defaultGroupedItems.value;
    }

    const filtered = search(cmd.value, mainItems, { keySelector: (x: PromptItem): string => x.title });

    return groupBy(filtered, (x) => x.group);
});

const setSelectedToFirst = (): void => {
    const firstGroupWithItems = Object.values(filteredGroups.value).find((xs) => xs.length > 0);
    const selectedItem = firstGroupWithItems ? firstGroupWithItems[0] : null;
    selected.value = selectedItem ? selectedItem.id : null;
};

const getNeighbor = (
    groupedItems: Record<string, PromptItem[]>,
    id: string | null,
    offsetBy: number
): PromptItem | null => {
    const flattenedItems = Object.values(groupedItems).flat();

    if (flattenedItems.length === 0) {
        return null; // Immediately return null when there are no items
    }

    const selectedIndex = id ? flattenedItems.findIndex((x: PromptItem) => x.id === id) : 0;
    let nextIndex = (selectedIndex + offsetBy) % flattenedItems.length;

    // Wrap around for negative indices
    if (nextIndex < 0) {
        nextIndex += flattenedItems.length;
    }

    const nextItem = flattenedItems[nextIndex] || null;

    return nextItem;
};

const scrollIntoView = (id: string): void => {
    const el = document.querySelector(`[data-id='item-${id}']`);
    if (el) {
        el.scrollIntoView(false);
    }
};

const selectNext = (): void => {
    const neighbor = getNeighbor(filteredGroups.value, selected.value, 1);
    if (neighbor) {
        const id = neighbor.id!;
        scrollIntoView(id);
        selected.value = id;
    }
};

const selectPrev = (): void => {
    const neighbor = getNeighbor(filteredGroups.value, selected.value, -1);
    if (neighbor) {
        const id = neighbor.id!;
        scrollIntoView(id);
        selected.value = neighbor.id!;
    }
};

const submit = (): void => {
    const item = mainItems.find((x) => x.id === selected.value);
    if (item) {
        console.log(item);
    }
};

watch(cmd, () => {
    setSelectedToFirst();
});

onMounted(() => {
    if (inputRef.value) {
        inputRef.value.focus();
    }
});
</script>

<template>
    <div
        class="flex flex-col data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[12px] h-[90vh] max-h-[440px] overflow-hidden bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]">
        <input
            id="command"
            ref="inputRef"
            v-model="cmd"
            class="border-b outline-none border-[#D9D9D9] px-[16px] py-[22px] w-full outline-none placeholder:text-[#888888]"
            type="text"
            placeholder="Type a command or search..."
            @keydown.enter.prevent="submit"
            @keydown.up.prevent="selectPrev"
            @keydown.down.prevent="selectNext" />
        <div class="overflow-y-auto overflow-x-hidden h-full max-h-[calc(440px-76px)]">
            <div class="px-[8px] py-[16px] flex flex-col gap-y-4">
                <template v-for="(groupItems, group) in filteredGroups" :key="group">
                    <div v-if="groupItems && groupItems.length !== 0">
                        <p class="text-[#888] text-xs font-medium pl-2 mb-2">
                            {{ group }}
                        </p>
                        <PromptCard
                            v-for="item in groupItems"
                            :key="item.id"
                            :item="item"
                            :selected="selected === item.id"
                            :set-selected="setSelected"
                            @on-click="console.log" />
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
