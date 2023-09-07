import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import component from "./TodoNew.vue";
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHistory } from "vue-router";
import { flushPromises } from "@vue/test-utils";
import routes from "../routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

vi.mock("../services/todos", () => ({
  default: function Todos() {
      this.index = vi.fn().mockResolvedValue({data: [{ id: 1 }, { id: 2 }, { id: 3 }]});
      this.show = vi.fn().mockResolvedValue(42);
      this.create = vi.fn().mockResolvedValue(42);
    },
}));
import { useTodosStore } from "../stores/todos";



describe("Todos page", () => {
  beforeEach(async () => {
    const todos = useTodosStore();
    await todos.fetchAll()
    router.push("/1");
    await router.isReady();
  });

  const global = {
    plugins: [router, createTestingPinia()]
  }
  it("mounts without error", async () => {
    const wrapper = mount(component, { global });
    await flushPromises()
    expect(wrapper.exists).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
  it("save button emits", async () => {
    const wrapper = mount(component, { global });
    const push = vi.spyOn(router, 'push');
    await wrapper.find("input").setValue("hello");
    await wrapper.find("button.btn-primary").trigger("click");
    await flushPromises()
    expect(push).toBeCalledWith('/');
  });
});
