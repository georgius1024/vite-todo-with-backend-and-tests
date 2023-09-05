<template>
  <RouterLink
    :to="`/${todo.id}`"
    class="list-group-item list-group-item-action"
  >
    <template v-if="todo.completed">✓</template>
    <template v-else>⨯</template>
    <span class="ms-1">
      {{ todo.title }}
    </span>
  </RouterLink>
</template>
<script setup lang="ts">
defineProps({
  todo: {
    type: Object,
    required: true,
  },
});
</script>
