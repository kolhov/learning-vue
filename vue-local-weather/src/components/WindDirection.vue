<script setup lang="ts">

import {computed} from "vue";

interface Props {
  degrees: number;
}
const props = defineProps<Props>();
const windStyle = computed(() => ({
  transform: "rotate(" + props.degrees + 'deg)',
}));
</script>

<template>
<span>
  <span aria-hidden="true" class="inline-block" data-testid="direction" :style="windStyle">↓
    <span class="sr-only">Wind direction: {{degrees}} degrees</span>
  </span>
</span>
</template>

<style scoped>

</style>