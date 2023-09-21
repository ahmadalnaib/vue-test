import { describe, test, expect } from "vitest";
import { mount } from '@vue/test-utils'
import DataView from '../DataView.vue'


import data from '../../../db.json'; 

describe("DataView", () => {
  test("renders properly", () => {
    const wrapper = mount(DataView, {
      props: { data } 
    });

   
  });
});
