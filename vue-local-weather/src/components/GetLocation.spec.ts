import {describe, it, expect, vi} from "vitest";
import {shallowMount} from "@vue/test-utils";
import GetLocation from "@/components/GetLocation.vue";

describe('GetLocation', () => {
  it('displays when geolocation resolved successfully', async () => {
    const mockGeoLocation = vi.fn((succesCallback: Function) =>{
      const position = {
        coords: {
          latitude: 51.4,
          longitude: -0.123
        }
      };
      succesCallback(position);
    });
    global.navigator.geolocation = {
      getCurrentPosition: mockGeoLocation,
    }
    const wrapper = await shallowMount(GetLocation);
    expect(wrapper.vm.coords).toEqual({
      latitude: 51.4,
      longitude: -0.123
    });
  });
})