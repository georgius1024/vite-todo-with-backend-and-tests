import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHistory } from "vue-router";
import { flushPromises } from "@vue/test-utils";
import routes from "./routes";
import component from "./App.vue";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

vi.mock("../services/todos", () => ({
  default: function Todos() {
      this.index = vi.fn().mockResolvedValue({data: [{ id: 1 }, { id: 2 }, { id: 3 }]});
    },
}));


describe("App", () => {
  beforeEach(async () => {
    router.push("/");
    await router.isReady();
  });

  const global = {
    plugins: [router, createTestingPinia()],
  };

  it("mounts without error", async () => {
    const wrapper = mount(component, { global });
    await flushPromises()
    expect(wrapper.exists).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

});
