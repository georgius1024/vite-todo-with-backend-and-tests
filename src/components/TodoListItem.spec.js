import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import component from "./TodoListItem.vue";
import { createRouter, createWebHistory } from "vue-router";
import routes from "../routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe("TodoListItem", () => {
  beforeEach(async () => {
    router.push("/");
    await router.isReady();
  });

  const propsData = {
    todo: {
      id: 101,
      title: "hello",
      completed: true,
    },
  };

  const global = {
    plugins: [router],
  };

  it("mounts without error", () => {
    const wrapper = mount(component, { propsData, global });
    expect(wrapper.exists).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("item click navigates", async () => {
    const push = vi.spyOn(router, 'push');
    const wrapper = mount(component, { propsData, global });
    await wrapper.find("a").trigger("click");
    expect(push).toBeCalledWith('/101');
  });
});
