<script setup lang="ts">
import { defineProps } from 'vue';
import * as icons from './icons';
import type { PromptItem } from './types';

export type Props = {
    item: PromptItem;
    onClick?: (id: string) => void;
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
        class="flex justify-between items-center h-[40px] hover:bg-[#3b82f6] hover:text-white rounded-lg p-2 select-none cursor-pointer"
        @click="onClick">
        <div class="flex gap-2">
            <Icon />
            <h4>{{ props.item.title }}</h4>
        </div>
        <p v-if="props.item.action" class="text-[#888] text-sm">
            {{ props.item.action.label }}
        </p>
    </div>
</template>
