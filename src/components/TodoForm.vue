<template>
  <form @sumbit.stop.prevent>
    <input type="hidden" :value="localCopy.id" />
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">
        Enter title
      </label>
      <input type="text" class="form-control" v-model="localCopy.title" />
    </div>
    <div class="form-check my-3">
      <label class="form-check-label">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="localCopy.completed"
        />
        Completed
      </label>
    </div>
    <div class="mt-4">
      <button type="button" class="btn btn-outline-primary me-4" @click="goHome">
        Cancel
      </button>
      <button type="submit" class="btn btn-primary me-4" @click="emit('save', localCopy)">
        Save
      </button>
      <button v-if="!isNew" type="submit" class="btn btn-danger float-end" @click="emit('destroy', localCopy)">
        Delete
      </button>
    </div>
  </form>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const localCopy = ref({});
const router = useRouter()
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
  localCopy.value = props.todo;
});

const goHome = () => {
  router.push('/')
}
</script>
