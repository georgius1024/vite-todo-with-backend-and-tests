<template>
  <div>
    <h1>Update TODO Item</h1>
    <TodoForm :todo="todo" @save="update" @destroy="destroy" :key="todo.id"/>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TodoForm from '../components/TodoForm.vue';


import { useTodosStore } from "../stores/todos";

const todos = useTodosStore();

const route = useRoute()
const router = useRouter()
const todo = ref({})
onMounted(() => {
  todo.value = {...todos.list.find(e => e.id == route.params.id)}
})
const update = (todo) => {
  todos.update(todo)
  router.push('/')
}
const destroy = (todo) => {
  todos.destroy(todo)
  router.push('/')
}
</script>