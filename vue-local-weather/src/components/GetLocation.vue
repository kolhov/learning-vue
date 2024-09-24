<script setup lang="ts">

import type {Ref} from "vue";
import {onMounted, ref} from "vue";
import WeatherReport from "@/components/WeatherReport.vue";

type Geolocation = {
  latitude: number;
  longitude: number;
};

const coords: Ref<Geolocation | undefined> = ref();
const geolocationBlockedByUser: Ref<boolean> = ref(false);

async function getGeolocation(): Promise<any> {
  await navigator.geolocation.getCurrentPosition(
      async (pos) => {
        coords.value = pos.coords;
      },
      error
  );
}

function error(err: { message: string }) {
  geolocationBlockedByUser.value = true;
  console.error(err.message);
}

onMounted(async () => {
  await getGeolocation();
});

</script>

<template>
  <div v-if="coords && !geolocationBlockedByUser">
    <weather-report :coords="coords" />
  </div>
  <div v-if="geolocationBlockedByUser">
    User denied access
  </div>
</template>

<style scoped>

</style>