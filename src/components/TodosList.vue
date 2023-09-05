<script setup>
import TodoListItem from "./TodoListItem.vue";
defineProps({
  todos: {
    type: Array,
    required: true,
  },
  current: {
    type: Number,
    required: true,
  },
  maxPage: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(["paginate"]);
</script>

<template>
  <div>
    <div class="list-group">
      <TodoListItem
        v-for="todo in todos"
        href="#"
        :key="todo.id"
        :todo="todo"
      />
    </div>

    <ul class="pagination mt-4">
      <li v-for="page in maxPage" class="page-item" :key="page">
        <div class="page-item">
          <a
            class="page-link"
            href="javascript:void(0)"
            :class="{ active: page - 1 === current }"
            @click.prevent="emit('paginate', page - 1)"
          >
            {{ page }}
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.todo-list {
  padding: 32px 0;
}
</style>
