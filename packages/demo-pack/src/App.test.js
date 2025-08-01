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
