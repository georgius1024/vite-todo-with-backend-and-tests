<script setup lang="ts">
import {onMounted} from 'vue'

import { useTodosStore } from './stores/todos'

const todos = useTodosStore()

onMounted(async () => {
  todos.fetchAll()
})

</script>

<template>
  <div class="app v-100 h-100">
    <RouterView class="panel"/>
  </div>
</template>

<style lang="scss" scoped>
.app {
  background-color: #aaa;
  min-height: 100vh;
  overflow: hidden;
  background: url('./assets/wallpaper.jpg');
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.panel {
  width: 500px;
  padding: 32px;
  background: white;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.75);
  border: 1px solid #aaa;
}
</style>
