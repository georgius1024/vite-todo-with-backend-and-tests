import { defineStore } from "pinia";
import Todos from "../services/todos";
const RECORDS_PER_PAGE = 10;
export const useTodosStore = defineStore("todos", {
  state: () => ({ list: [], page: 0, service: new Todos() }),
  getters: {
    currentPage: (state) =>
      state.list.slice(
        state.page * RECORDS_PER_PAGE,
        (state.page + 1) * RECORDS_PER_PAGE
      ),
    maxPage: (state) =>
      Math.min(Math.ceil(state.list.length / RECORDS_PER_PAGE), 5),
  },
  actions: {
    async fetchAll() {
      const { data } = await this.service.index();
      this.list = data;
    },
    paginate(page) {
      this.page = page;
    },
    async update(todo) {
      this.list = this.list.map((e) => {
        if (e.id === todo.id) {
          return todo;
        }
        return e;
      });
      await this.service.update(todo.id, todo);
    },
    async create(todo) {
      this.list = [todo, ...this.list];
      await this.service.create(todo);
    },
    async destroy(todo) {
      this.list = this.list.filter((e) => (e.id !== todo.id));
      await this.service.destroy(todo.id);
    },
  },
});
