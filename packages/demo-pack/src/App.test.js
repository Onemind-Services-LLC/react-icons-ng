import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { it, expect } from "@jest/globals";

import App from "./App";

it("renders without crashing", () => {
  render(<App />);
});

it("renders icons and applies IconContext values", () => {
  const { container } = render(<App />);
  const icons = Array.from(container.querySelectorAll("svg"));
  const iconTitles = icons.map(
    (icon) => icon.querySelector("title")?.textContent,
  );
  const folderIcon = icons.find(
    (icon) => icon.querySelector("title")?.textContent === "folder icon",
  );

  expect(iconTitles).toEqual(
    expect.arrayContaining([
      "accessibility icon",
      "arrow down icon",
      "folder outside provider",
      "grommet icon",
    ]),
  );
  expect(folderIcon).toBeDefined();
  expect(folderIcon).toHaveClass("global-class-name additional-class-name");
  expect(folderIcon).toHaveStyle({ color: "red" });
  expect(folderIcon).toHaveAttribute("focusable", "false");

  const outsideProviderFolder = icons.find(
    (icon) =>
      icon.querySelector("title")?.textContent === "folder outside provider",
  );
  expect(outsideProviderFolder).toBeDefined();
  expect(icons).toHaveLength(6);
  expect(outsideProviderFolder).not.toHaveClass("global-class-name");
  expect(outsideProviderFolder).not.toHaveStyle({ color: "blue" });
});
