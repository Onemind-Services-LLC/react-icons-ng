import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "./App";

it("renders without crashing", () => {
  render(<App />);
});

it("snapshot test", () => {
  const { container } = render(<App />);
  expect(container.firstChild).toMatchSnapshot();
});

it("always includes a title", () => {
  const { container } = render(<App />);
  const icons = container.getElementsByTagName("svg");
  for (let i = 0; i < icons.length; i++) {
    expect(icons[i].getElementsByTagName("title").length).toBe(1);
  }
});
