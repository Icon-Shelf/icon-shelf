import type { Plugin } from "svgo";

export const svgoPluginsConfiguration: Plugin[] = [
  {
    name: "cleanupAttrs",
    active: true,
  },
  {
    name: "cleanupEnableBackground",
    active: true,
  },
  {
    name: "cleanupIDs",
    active: true,
  },
  {
    name: "cleanupNumericValues",
    active: true,
  },
  {
    name: "collapseGroups",
    active: true,
  },
  {
    name: "convertColors",
    active: true,
  },
  {
    name: "convertEllipseToCircle",
    active: true,
  },
  {
    name: "convertPathData",
    active: true,
  },
  {
    name: "convertShapeToPath",
    active: false,
  },
  {
    name: "convertTransform",
    active: true,
  },
  {
    name: "inlineStyles",
    active: true,
  },
  {
    name: "mergePaths",
    active: false,
  },
  {
    name: "mergeStyles",
    active: true,
  },
  {
    name: "moveElemsAttrsToGroup",
    active: true,
  },
  {
    name: "moveGroupAttrsToElems",
    active: true,
  },
  {
    name: "removeComments",
    active: true,
  },
  {
    name: "removeDesc",
    active: true,
  },
  {
    name: "removeDoctype",
    active: true,
  },
  {
    name: "removeEditorsNSData",
    active: true,
  },
  {
    name: "removeEmptyAttrs",
    active: true,
  },
  {
    name: "removeEmptyContainers",
    active: true,
  },
  {
    name: "removeEmptyText",
    active: true,
  },
  {
    name: "removeHiddenElems",
    active: true,
  },
  {
    name: "removeMetadata",
    active: true,
  },
  {
    name: "removeNonInheritableGroupAttrs",
    active: true,
  },
  {
    name: "removeTitle",
    active: true,
  },
  {
    name: "removeUnknownsAndDefaults",
    active: true,
  },
  {
    name: "removeUnusedNS",
    active: true,
  },
  {
    name: "removeUselessDefs",
    active: true,
  },
  {
    name: "removeUselessStrokeAndFill",
    active: true,
  },
  {
    name: "removeViewBox",
    active: false,
  },
  {
    name: "removeXMLProcInst",
    active: true,
  },
  {
    name: "sortDefsChildren",
    active: true,
  },
  {
    name: "removeRasterImages",
    active: false,
  },
  {
    name: "sortAttrs",
    active: true,
  },
];
