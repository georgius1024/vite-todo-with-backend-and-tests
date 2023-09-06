import { describe, it, expect, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";

vi.mock("../services/todos", () => ({
  default: function Todos() {
      this.index = vi.fn().mockResolvedValue({data: [{ id: 1 }, { id: 2 }, { id: 3 }]});
      this.show = vi.fn().mockResolvedValue(42);
      this.create = vi.fn().mockResolvedValue(42);
      this.update = vi.fn().mockResolvedValue(42);
      this.destroy = vi.fn().mockResolvedValue(42);
    },
}));
import { useTodosStore } from "./todos";

describe("todos store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("fetches todos", async () => {
    const todos = useTodosStore();
    const index = vi.spyOn(todos.service, 'index')
    await todos.fetchAll()
    expect(index).toHaveBeenCalled();
  });

  it("getters works as expected", async () => {
    const todos = useTodosStore();
    await todos.fetchAll()
    expect(todos.currentPage).toHaveLength(3);
    expect(todos.maxPage).toBe(1);
  });

  it("paginate works as expected", async () => {
    const todos = useTodosStore();
    todos.paginate(10)
    expect(todos.page).toBe(10);
  });

  it("update works as expected", async () => {
    const todos = useTodosStore();
    const update = vi.spyOn(todos.service, 'update')
    await todos.fetchAll()
    await todos.update({id: 1, title: 'updated'})
    expect(update).toHaveBeenCalled();
    expect(todos.currentPage).toHaveProperty('0.title', 'updated');
  });

  it("create works as expected", async () => {
    const todos = useTodosStore();
    const create = vi.spyOn(todos.service, 'create')
    await todos.fetchAll()
    await todos.create({id: 99, title: 'created'})
    expect(create).toHaveBeenCalled();
    expect(todos.currentPage).toHaveProperty('0.title', 'created');
  });

  it("destroy works as expected", async () => {
    const todos = useTodosStore();
    const destroy = vi.spyOn(todos.service, 'destroy')
    await todos.fetchAll()
    await todos.destroy({id: 1})
    expect(destroy).toHaveBeenCalled();
    expect(todos.currentPage).toHaveLength(2);
  });

});
