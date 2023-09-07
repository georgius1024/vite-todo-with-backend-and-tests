<script setup>
import TodosList from "../components/TodosList.vue";
import { useTodosStore } from "../stores/todos";
const todos = useTodosStore();
</script>

<template>
  <div>
    <h1>Todos</h1>
    <TodosList
      :todos="todos.currentPage"
      :current="todos.page"
      :maxPage="todos.maxPage"
      @paginate="todos.paginate($event)"
    />
    <RouterLink role="button" class="btn btn-secondary" to="/new">New</RouterLink>
  </div>
</template>
