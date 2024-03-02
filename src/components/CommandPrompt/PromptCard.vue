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
    <div class="prompt-card">
        <Icon />
        <div>
            <h4>{{ props.item.title }}</h4>
            <p>{{ props.item.group }}</p>
            <button v-if="props.item.action" @click="onClick">
                {{ props.item.action.label }}
            </button>
        </div>
    </div>
</template>
