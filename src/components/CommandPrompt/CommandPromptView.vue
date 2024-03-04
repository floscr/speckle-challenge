<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { search } from 'fast-fuzzy';
import { mainItems, membersViewItems } from './data.ts';
import PromptCard from './PromptCard.vue';
import type { PromptItem } from './types';
import { dropLast, groupBy } from 'remeda';
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'radix-vue';
import BackButton from './assets/BackButton.svg';

// An array of item lists to display in the prompt
// The last list of items is always the current one that is visible to the user
// When navigating to a sub-view just push onto the items array
// To navigate back pop the last value
const items = ref([mainItems]);
const currentItems = computed(() => items.value[items.value.length - 1]);
const showBackButton = computed(() => items.value.length > 1);
const canDelete = computed(() => items.value.length > 1 && cmd.value === '');

// The current selection uuid
const selected = ref<string | null>(mainItems[0]!.id);
const setSelected = (id: string): void => {
    selected.value = id;
};

const cmd = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

const filteredGroups = computed(() => {
    if (cmd.value.trim() === '') {
        return groupBy(currentItems.value!, (x) => x.group);
    }

    const filtered = search(cmd.value, currentItems.value!, { keySelector: (x: PromptItem): string => x.title });

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

    // No items found
    if (flattenedItems.length === 0) {
        return null;
    }

    const selectedIndex = id ? flattenedItems.findIndex((x: PromptItem) => x.id === id) : 0;
    let nextIndex = (selectedIndex + offsetBy) % flattenedItems.length;

    // Wrap around for negative indices, so when going up/down from the first/last item we select the last/first item.
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

const select = (id: string): void => {
    scrollIntoView(id);
    selected.value = id;
};

const selectNext = (): void => {
    const neighbor = getNeighbor(filteredGroups.value, selected.value, 1);
    if (neighbor) {
        const id = neighbor.id!;
        select(id);
    }
};

const selectPrev = (): void => {
    const neighbor = getNeighbor(filteredGroups.value, selected.value, -1);
    if (neighbor) {
        const id = neighbor.id!;
        select(id);
    }
};

const submit = (id?: string): void => {
    const targetId = id || selected.value;
    const item = mainItems.find((x) => x.id === targetId);

    if (!item) {
        return;
    }

    if (item?.action?.actionId === 'ManageMembers') {
        items.value = [...items.value, membersViewItems];
    } else {
        console.log(item);
    }
};

const focusInput = (): void => {
    if (inputRef.value) {
        inputRef.value.focus();
    }
};

const goBack = (): void => {
    items.value = dropLast(items.value, 1);
};

const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
        e.preventDefault();
        submit();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectPrev();
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectNext();
    } else if (canDelete.value && e.key === 'Backspace') {
        goBack();
    }
};

// When changing the cmd filter & items stack -> select the first item
watch(cmd, () => {
    setSelectedToFirst();
});
watch(items, () => {
    cmd.value = '';
    setSelectedToFirst();
});

onMounted(() => {
    focusInput();
    window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
    <div
        class="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] z-[100] flex h-[90vh] max-h-[440px] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] flex-col overflow-hidden rounded-[12px] bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <div class="flex h-16 w-full items-center border-b border-[#D9D9D9] px-[16px]">
            <BackButton v-if="showBackButton" class="mr-4 cursor-pointer hover:brightness-90" @click="goBack" />
            <input
                id="command"
                ref="inputRef"
                v-model="cmd"
                class="h-full w-full outline-none outline-none placeholder:text-[#888888]"
                type="text"
                placeholder="Type a command or search..."
                autocomplete="off" />
        </div>
        <ScrollAreaRoot
            class="h-full max-h-[calc(440px-76px)] w-full overflow-hidden outline-none"
            style="--scrollbar-size: 10px"
            type="auto">
            <ScrollAreaViewport class="h-full w-full rounded">
                <div class="flex flex-col gap-y-4 px-[8px] py-[16px]">
                    <template v-for="(groupItems, group) in filteredGroups" :key="group">
                        <div v-if="groupItems && groupItems.length !== 0">
                            <p class="mb-2 pl-2 text-xs font-medium text-[#888]">
                                {{ group }}
                            </p>
                            <PromptCard
                                v-for="item in groupItems"
                                :key="item.id"
                                :item="item"
                                :selected="selected === item.id"
                                :set-selected="setSelected"
                                :on-click="submit" />
                        </div>
                    </template>
                </div>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar
                class="flex touch-none select-none p-0.5 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
                orientation="vertical">
                <ScrollAreaThumb
                    class="relative flex-1 rounded-[10px] bg-[rgba(0,0,0,0.15)] before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
            </ScrollAreaScrollbar>
            <ScrollAreaScrollbar
                class="ml-2 flex touch-none select-none p-0.5 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
                orientation="horizontal">
                <ScrollAreaThumb
                    class="relative flex-1 rounded-[10px] bg-[rgba(0,0,0,0.15)] before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
            </ScrollAreaScrollbar>
        </ScrollAreaRoot>
    </div>
</template>

<style scoped></style>
