import {describe, it, expect} from "vitest";
import {shallowMount} from "@vue/test-utils";
import App from "./App.vue";
import GetLocation from "@/components/GetLocation.vue";


describe("App", () => {
  it("renders the GetLocation component", () => {
    const wrapper = shallowMount(App);
    expect(wrapper.findComponent(GetLocation).exists()).toBe(true);
  });
});