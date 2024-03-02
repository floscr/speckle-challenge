<script setup lang="ts">
import { ref, computed } from 'vue';
import { DialogContent } from 'radix-vue';
import { search } from 'fast-fuzzy';
import { mainItems } from './data.ts';
import PromptCard from './PromptCard.vue';
import type { PromptItem } from './types';
import { groupBy, mapValues } from 'remeda';

const items = ref(groupBy(mainItems, (x) => x.group));

const cmd = ref('');
const inputRef = ref(null);

const filteredGroups = computed(() => {
    if (cmd.value.trim() === '') {
        console.log(items);
        return items.value;
    }

    const filtered = mapValues(items.value, (items) =>
        search(cmd.value, items, { keySelector: (x: PromptItem): string => x.title })
    );
    return filtered;
});
</script>

<template>
    <DialogContent
        class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-[440px] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[12px] overflow-hidden bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]">
        <div class="text-base text-black">
            <input
                id="command"
                ref="inputRef"
                v-model="cmd"
                class="border-b outline-none border-[#D9D9D9] px-[16px] py-[22px] w-full outline-none placeholder:text-[#888888]"
                type="text"
                placeholder="Type a command or search..." />
            <div class="px-[8px] py-[16px]">
                <div v-for="(groupItems, group) in filteredGroups" :key="group">
                    <p v-if="groupItems.length !== 0" class="text-[#888] text-xs font-medium">{{ group }}</p>
                    <PromptCard v-for="item in groupItems" :key="item.id" :item="item" @on-click="console.log" />
                </div>
            </div>
        </div>
    </DialogContent>
</template>

<style scoped></style>
