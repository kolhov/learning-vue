<script setup lang="ts">
import type { Ref } from 'vue';
import {ref, watch} from "vue";

const emit = defineEmits(['searchSubmit']);

interface Props {
  isSearching: boolean;
}
let timeout: number;
const props = defineProps<Props>();
const query: Ref<string> = ref('');

function search() {
  emit('searchSubmit', query.value);
}

function debouncedSearch(){
  clearTimeout(timeout);
  timeout = setTimeout(async () => {
    search();
  }, 500);
}

watch(query, () => {
  debouncedSearch();
});
</script>

<template>
  <form class="flex justify-center my-8" v-on:submit.prevent="search">
    <input class="px-3 py-2 border rounded-md rounded-r-none disabled:opacity-40
    border-slate-300 text-slate-800 focus:border-slate-500"
    type="text"
    v-model="query"
    placeholder="Search..."
    :disabled="isSearching" />
    <button class="px-4 py-2 text-sm font-bold text-white transition-colors duration-300
      rounded-md rounded-l-none disabled:opacity-40 bg-slate-500 hover:bg-slate-600"
            :disabled="isSearching"
            type="submit">
      Search
    </button>
  </form>
</template>

<style scoped>

</style>