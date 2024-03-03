<script setup lang="ts">
import { defineProps } from 'vue';
import * as icons from './icons';
import type { PromptItem } from './types';

export type Props = {
    item: PromptItem;
    onClick?: (id: string) => void;
    selected: boolean;
    setSelected: (id: string) => void;
};

const props = defineProps<Props>();

// Ignoring type of icons components list for simplicity's sake
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Icon = (icons as any)[props.item.icon];

const onClick = (): void => {
    if (props.onClick) {
        props.onClick(props.item.id);
    }
};
</script>

<template>
    <div
        class="wrapper flex justify-between items-center h-[40px] group rounded-lg p-2 select-none cursor-pointer text-sm"
        :class="{ selected: selected }"
        @mouseover="setSelected(props.item.id)"
        @click="onClick">
        <div class="flex items-center gap-2">
            <Icon />
            <p>{{ props.item.title }}</p>
        </div>
        <p v-if="props.item.action" class="text-[#888]">
            {{ props.item.action.label }}
        </p>
    </div>
</template>

<style scoped>
.wrapper:hover,
.selected {
    color: white;
    background-color: #3b82f6;
}

.wrapper:hover >>> p,
.selected >>> p {
    color: white;
}

.wrapper:hover >>> path,
.selected >>> path {
    stroke: white;
}
</style>
