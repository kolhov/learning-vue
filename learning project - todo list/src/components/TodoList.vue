<script setup lang="ts">
import ListItem from "./ListItem.vue";
import {ref, computed, onMounted} from 'vue';
import type { Ref } from 'vue';

type Item = {
  title: string;
  checked?: boolean;
}

const storageItems: Ref<Item[]> = ref([]);

onMounted(() => {
  const itemList = getFromStorage();
  if (itemList.length > 0) {
    storageItems.value = itemList
  } else {
    initListItems();
  }
})

function initListItems(){
  if (storageItems.value?.length === 0){
    const listItems = [
      {title: 'пройти первый этап вуе', checked: false},
      {title: 'поесть', checked: true},
      {title: 'выжить', checked: true}
    ]

    setToStorage(listItems);
    storageItems.value = listItems;
}}

function updateItem(item: Item) {
  const updatedItem = findItemInList(item);
  if (updatedItem) toggleItemChecked(updatedItem);
  setToStorage(storageItems.value);
}
function findItemInList(item: Item) : Item | undefined {
  return storageItems.value.find((x) => x.title === item.title)
}
function toggleItemChecked(item: Item) {
  item.checked = !item.checked
}

const sortedList = computed(() =>
  [...storageItems.value].sort((a, b) => (a.checked? 1 : 0) -
      (b.checked ? 1 : 0)))

function setToStorage(item: Item[]){
  localStorage.setItem('list-items', JSON.stringify(item))
}
function getFromStorage(): Item[] | []{
  const stored = localStorage.getItem('list-items');
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
}


</script>

<template>
<ul>
  <li :key="key" v-for="(item, key) in sortedList">
    <ListItem :is-checked="item.checked"
              v-on:click.prevent="updateItem(item)">{{item.title}}</ListItem>
  </li>
</ul>
</template>

<style scoped>
li {
  margin: 0.4rem 0;
}
</style>