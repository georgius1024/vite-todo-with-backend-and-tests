<template>
  <form @sumbit.stop.prevent>
    <input type="hidden" :value="todo.id" />
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">
        Enter title
      </label>
      <input type="text" class="form-control" v-model="todo.title" />
    </div>
    <div class="form-check my-3">
      <label class="form-check-label">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="todo.completed"
        />
        Completed
      </label>
    </div>
    <div class="mt-4">
      <RouterLink type="button" class="btn btn-outline-primary me-4" to="/">
        Cancel
      </RouterLink>
      <button type="submit" class="btn btn-primary me-4" @click="emit('save', todo)">
        Save
      </button>
      <button v-if="!isNew" type="submit" class="btn btn-danger float-end" @click="emit('destroy', todo)">
        Delete
      </button>
    </div>
  </form>
</template>
<script setup>
import { ref, onMounted } from "vue";

const title = ref("");

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
  isNew: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(["save", "destroy"]);

onMounted(() => {
  title.value = props.todo.title;
});
</script>
