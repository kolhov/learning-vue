<script setup lang="ts">
import {ref, onMounted, watch} from "vue";
import type {Ref} from "vue";
import type {Comic} from "@/types/marvel";
import {useComics} from "@/composables/marvelApi";
import LoadingIndicator from "@/components/LoadingIndicator.vue";
import ComicCard from "@/components/ComicCard.vue";
import {useRoute, useRouter} from 'vue-router';
import Pagination from "@/components/Pagination.vue";

const route = useRoute();
const router = useRouter();
const currentPage: Ref<number | string> = ref(0);
const totalPages: Ref<number> = ref(0);
const isLoading: Ref<boolean> = ref(false);
const data: Ref<Comic[] | undefined> = ref();

if (route.params.page) {
  currentPage.value = +route.params.page;
}

async function getComics(page: number = 0) {
  try {
    isLoading.value = true;
    const comics = await useComics(page);

    currentPage.value = comics?.offset / comics?.limit || 0;
    totalPages.value = Math.ceil(comics.total / comics.limit);

    data.value = comics.results;
    isLoading.value = false;
  } catch (err) {
    router.push({ path: 'error', query: { info: err as string }});
  }
}

watch(() => route.params.page, async (newPage) => {
  await getComics(+newPage);
})

onMounted(async () => {
  await getComics(+currentPage.value);
});
</script>

<template>
  <div>
    <LoadingIndicator v-if="isLoading" text="Loading..."/>
    <div v-if="data && !isLoading">
      <div class="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div v-for="comic in data" :key="comic.id">
          <comic-card :comic="comic"/>
        </div>
      </div>

      <Pagination path="/" :total-pages="totalPages" :current-page="+currentPage"/>
    </div>
  </div>
</template>

<style scoped>

</style>