<script setup lang="ts">
import type {Ref} from "vue";
import {onMounted, ref} from "vue";
import WindDirection from "@/components/WindDirection.vue";

type WeatherData = {
  location: {
    localtime: Date;
    name: string;
    region: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    precip_mm: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_degree: number;
    wind_kph: number;
    wind_mph: number;
  };
}
type Coords = {
  latitude: number;
  longitude: number;
};

interface Props {
  coords: Coords;
}

const props = defineProps<Props>();
const data: Ref<WeatherData | undefined> = ref();

async function fetchWeather(coords: Coords): Promise<WeatherData> {
  const {latitude, longitude} = coords;
  const q = `${latitude},${longitude}`;
  const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${
      import.meta.env.VITE_APP_WEATHER_API_KEY}&q=${q}`)
  return res && await res.json();
}
function formatDate(dateString: Date) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('default',{
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(date);
}

onMounted(async () => {
  const weatherResponse = await fetchWeather(props.coords);
  data.value = weatherResponse;
})
</script>

<template>
  <div>
    <article
        v-if="data && data.current"
        class="max-w-md w-96 rounded-lg shadow-lg p-4 flex bg-white text-black">
      <div class="basis-1/4 text-left">
        <img :src="data.current.condition.icon" class="h-16 w-16" />
      </div>
      <div class="basis-3/4">
        <h1 class="text-3xl font-bold">
          {{data.current.condition.text}}
          <span class="text-2xl block">
            {{data.current.temp_c}}&#8451;
          </span>
        </h1>
        <p>{{data.location.name}} {{data.location.region}}</p>
        <p>Precipitation: {{data.current.precip_mm}}mm</p>
        <p>{{ formatDate(data.location.localtime) }}</p>
        <p>
          Wind: {{data.current.wind_kph}} kph
          <wind-direction :degrees="data.current.wind_degree"/>
        </p>
      </div>
    </article>
    <div v-else>Loading...</div>
  </div>
</template>

<style scoped>

</style>