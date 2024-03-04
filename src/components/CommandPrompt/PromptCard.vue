<script setup lang="ts">
import { computed, defineProps } from 'vue';
import * as icons from './icons';
import * as avatars from './avatars';
import type { PromptItem } from './types';

export type Props = {
    item: PromptItem;
    onClick?: (id: string) => void;
    selected: boolean;
    setSelected: (id: string) => void;
};

const props = defineProps<Props>();

const iconComponent = computed(() => {
    if (props.item.icon.type === 'Svg') {
        // Ignoring type of icons components list for simplicity's sake
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (icons as any)[props.item.icon.value];
    }
    return 'img';
});

const imageProps = computed(() => {
    if (props.item.icon.type === 'Img') {
        // Ignoring type of icons components list for simplicity's sake
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return { src: (avatars as any)[props.item.icon.value], alt: '' };
    }
    return null;
});

const onClick = (): void => {
    if (props.onClick) {
        props.onClick(props.item.id);
    }
};
</script>

<template>
    <div
        class="wrapper group flex h-[40px] cursor-pointer select-none items-center justify-between rounded-lg p-2 text-sm"
        :class="{ selected: selected }"
        :data-id="`item-${props.item.id}`"
        @mouseover="setSelected(props.item.id)"
        @click="onClick">
        <div class="flex items-center gap-2">
            <component :is="iconComponent" v-if="imageProps" class="size-6 rounded-full" v-bind="imageProps" />
            <component :is="iconComponent" v-else />
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

.wrapper:hover :deep(p),
.selected :deep(p) {
    color: white;
}

.wrapper:hover :deep(path),
.selected :deep(path) {
    stroke: white;
}
</style>
