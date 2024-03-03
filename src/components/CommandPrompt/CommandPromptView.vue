<script setup lang="ts">
import { ref, computed } from 'vue';
import { search } from 'fast-fuzzy';
import { mainItems } from './data.ts';
import PromptCard from './PromptCard.vue';
import type { PromptItem } from './types';
import { groupBy } from 'remeda';

const defaultGroupedItems = ref(groupBy(mainItems, (x) => x.group));

const cmd = ref('');
const inputRef = ref(null);

const filteredGroups = computed(() => {
    if (cmd.value.trim() === '') {
        return defaultGroupedItems.value;
    }

    const filtered = search(cmd.value, mainItems, { keySelector: (x: PromptItem): string => x.title });

    return groupBy(filtered, (x) => x.group);
});
</script>

<template>
    <div
        class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-[440px] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[12px] overflow-hidden bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]">
        <div class="flex flex-col text-base text-black">
            <input
                id="command"
                ref="inputRef"
                v-model="cmd"
                class="border-b outline-none border-[#D9D9D9] px-[16px] py-[22px] w-full outline-none placeholder:text-[#888888]"
                type="text"
                placeholder="Type a command or search..." />
            <div class="overflow-auto flex-grow">
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
                                @on-click="console.log" />
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
