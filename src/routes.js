import Todos from "./views/Todos.vue";
import Todo from "./views/Todo.vue";
import TodoNew from "./views/TodoNew.vue";

export default [
  { path: "/new", component: TodoNew },
  { path: "/:id", component: Todo },
  { path: "/", component: Todos },
];
