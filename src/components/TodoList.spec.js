import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import component from "./TodosList.vue";


describe("TodosList", () => {
  const propsData = {
    todos: [{
      id: 101,
      title: "hello",
      completed: true,
    }],
    maxPage: 10,
    current: 0
  };
  const global = {
    stubs: ['RouterLink']
  }
  it("mounts without error", () => {
    const wrapper = mount(component, { propsData, global });
    expect(wrapper.exists).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("pagination click emits navigates", async () => {
    const wrapper = mount(component, { propsData, global});
    await wrapper.find("a.page-link").trigger("click");
    expect(wrapper.emitted().paginate).toHaveLength(1)
    expect(wrapper.emitted().paginate[0]).toEqual([0])
  });
});
