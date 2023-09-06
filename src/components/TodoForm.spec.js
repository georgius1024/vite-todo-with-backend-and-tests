import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { useRouter, useRoute } from 'vue-router'
import component from "./TodoForm.vue";

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({
    push: () => {}
  }))
}))

describe("TodosForm", () => {
  const propsData = {
    todo: {
      id: 101,
      title: "hello",
      completed: true,
    },
    isNew: false
  };
  it("mounts without error", () => {
    const wrapper = mount(component, { propsData });
    expect(wrapper.exists).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("cancel button navigates", async () => {
    const push = vi.fn()
    useRouter.mockImplementationOnce(() => ({
      push
    }))
    const wrapper = mount(component, { propsData });
    await wrapper.find("button.btn-outline-primary").trigger("click");
    expect(push).toHaveBeenCalledWith('/')
  });
  it("save button emits", async () => {
    const wrapper = mount(component, { propsData });
    await wrapper.find("input").setValue("hello");
    await wrapper.find("button.btn-primary").trigger("click");
    expect(wrapper.emitted().save).toHaveLength(1)
    expect(wrapper.emitted().save).toHaveProperty("0.0.title", "hello")
  });
  it("delete button emits", async () => {
    const wrapper = mount(component, { propsData });
    await wrapper.find("button.btn-danger").trigger("click");
    expect(wrapper.emitted().destroy).toHaveLength(1)
    expect(wrapper.emitted().destroy).toHaveProperty("0.0.title", "hello")
  });

});
