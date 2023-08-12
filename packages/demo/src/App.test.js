import React from "react";
import { createRoot } from "react-dom/client";
import { shallow } from "enzyme";

import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const container = createRoot(div);
  container.render(<App />);
});

it("snapshot test", () => {
  expect(shallow(<App />)).toMatchSnapshot();
});

it("always includes a title", () => {
  shallow(<App />);
  const icons = document.getElementsByTagName("svg");
  for (let i = 0; i < icons.length; i++) {
    expect(icons[i].getElementsByTagName("title").length).toBe(1);
  }
});
