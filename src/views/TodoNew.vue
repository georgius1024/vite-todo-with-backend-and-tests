<template>
  <div>
    <h1>Create TODO Item</h1>
    <TodoForm :todo="todo" :isNew="true" @save="update"/>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import TodoForm from '../components/TodoForm.vue';


import { useTodosStore } from "../stores/todos";

const todos = useTodosStore();

const router = useRouter()
const todo = ref({})
onMounted(() => {
  const nextId = (Math.max(...todos.list.map((e) => e.id).map(Number)) || 0) + 1
  todo.value = {id: nextId , title: '', completed: false}
})
const update = (data) => {
  todos.create(data)
  router.push('/')
}
</script>