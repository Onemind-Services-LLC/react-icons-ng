import { optimize } from "svgo";

export function optimizeSVG(svgStr: string) {
  return optimize(svgStr, {
    multipass: true,
    plugins: [
      "cleanupAttrs",
      "removeDoctype",
      "removeXMLProcInst",
      "removeComments",
      "removeMetadata",
      "removeTitle",
      "removeDesc",
      "removeUselessDefs",
      "removeEditorsNSData",
      "removeEmptyAttrs",
      "removeHiddenElems",
      "removeEmptyText",
      "removeEmptyContainers",
      // {
      //   name: "removeViewBox",
      //   params: { active: false }
      // },
      "cleanupEnableBackground",
      "convertStyleToAttrs",
      {
        name: "convertColors",
        params: { currentColor: true },
      },
      "convertPathData",
      "convertTransform",
      "removeUnknownsAndDefaults",
      "removeNonInheritableGroupAttrs",
      "removeUselessStrokeAndFill",
      "removeUnusedNS",
      "cleanupIds",
      "cleanupNumericValues",
      "moveElemsAttrsToGroup",
      "moveGroupAttrsToElems",
      "collapseGroups",
      // {
      //   name: "removeRasterImages",
      //   params: { active: false }
      // },
      "mergePaths",
      "convertShapeToPath",
      "sortAttrs",
      "removeDimensions",
      {
        name: "removeAttributesBySelector",
        params: {
          selector: "*:not(svg)",
          attributes: ["stroke"],
        },
      },
      {
        name: "removeAttrs",
        params: {
          attrs: "data.*",
        },
      },
    ],
  });
}
