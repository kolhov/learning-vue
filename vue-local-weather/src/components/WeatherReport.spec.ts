import {describe, it, expect, vi} from "vitest";
import {flushPromises, mount, shallowMount} from "@vue/test-utils";
import WeatherReport from "@/components/WeatherReport.vue";

describe('WeatherReport', () => {
  it('Should render the component without crashing', () => {
    global.fetch = vi.fn() as any
    const wrapper = shallowMount(WeatherReport, {
      props: {
        coords: {
          latitude: 0,
          longitude: 0
        }
      }
    });
    expect(wrapper).toBeTruthy();
  });

  it('Displays loading message when data is undefined', () => {
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve()
    })) as any

    const wrapper = shallowMount(WeatherReport, {
      props: {
        coords: {
          latitude: 0,
          longitude: 0
        }
      }
    });

    expect(wrapper.text()).toContain('Loading...');
  })

  it('Displays weather data when data is defined',async () => {
    const mockData = {
      location: {
        localtime: new Date(),
        name: 'Eindhoven',
        region: 'North Brabant',
        country: 'Netherlands',
        lat: 52.37,
        lon: 4.9
      },
      current: {
        temp_c: 10,
        temp_f: 50,
        humidity: 50,
        precip_in: 0.1,
        precip_mm: 2.5,
        condition: {
          text: 'Sunny',
          icon: 'https://via.placeholder.com/150'
        },
        wind_degree: 180,
        wind_dir: 'S',
        wind_kph: 10,
        wind_mph: 6.2
      }
    }
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData)
    })) as any

    const wrapper = mount(WeatherReport, {
      props: {
        coords: {
          latitude: 0,
          longitude: 0
        }
      }
    });
    await flushPromises();
    expect(wrapper.text()).toContain(mockData.current.temp_c);
  })
});