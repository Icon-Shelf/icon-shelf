export interface SvgoSettingItem {
  name: string;
  desc: string;
  active: boolean;
  isAux?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any;
}

export const svgoDefaultPreference: SvgoSettingItem[] = [
  {
    name: 'convertColors',
    desc: 'convert colors (from rgb() to #rrggbb, from #rrggbb to #rgb)',
    active: true,
  },
  {
    name: 'convertColors - currentColor',
    desc: 'convert fill and stroke values to currentColor',
    isAux: 'convertColors',
    params: { currentColor: true },
    active: false,
  },
  {
    name: 'cleanupAttrs',
    desc: 'cleanup attributes from newlines, trailing, and repeating spaces',
    active: true,
  },
  {
    name: 'mergeStyles',
    desc: 'merge multiple style elements into one',
    active: true,
  },
  {
    name: 'inlineStyles',
    desc: 'move and merge styles from <style> elements to element style attributes',
    active: true,
  },
  {
    name: 'removeDoctype',
    desc: 'remove doctype declaration',
    active: true,
  },
  {
    name: 'removeXMLProcInst',
    desc: 'remove XML processing instructions',
    active: true,
  },
  {
    name: 'removeComments',
    desc: 'remove comments',
    active: true,
  },
  {
    name: 'removeMetadata',
    desc: 'remove <metadata>',
    active: true,
  },
  {
    name: 'removeTitle',
    desc: 'remove <title>',
    active: true,
  },
  {
    name: 'removeDesc',
    desc: 'remove <desc>',
    active: true,
  },
  {
    name: 'removeUselessDefs',
    desc: 'remove elements of <defs> without id',
    active: true,
  },
  {
    name: 'removeXMLNS',
    desc: 'removes the xmlns attribute (for inline SVG)',
    active: false,
  },
  {
    name: 'removeEditorsNSData',
    desc: 'remove editors namespaces, elements, and attributes',
    active: true,
  },
  {
    name: 'removeEmptyAttrs',
    desc: 'remove empty attributes',
    active: true,
  },
  {
    name: 'removeHiddenElems',
    desc: 'remove hidden elements',
    active: true,
  },
  {
    name: 'removeEmptyText',
    desc: 'remove empty Text elements',
    active: true,
  },
  {
    name: 'removeEmptyContainers',
    desc: 'remove empty Container elements',
    active: true,
  },
  {
    name: 'removeViewBox',
    desc: 'remove viewBox attribute when possible',
    active: false,
  },
  {
    name: 'cleanupEnableBackground',
    desc: 'remove or cleanup enable-background attribute when possible',
    active: true,
  },
  {
    name: 'minifyStyles',
    desc: 'minify <style> elements content with CSSO',
    active: true,
  },
  {
    name: 'convertStyleToAttrs',
    desc: 'convert styles into attributes',
    active: false,
  },
  {
    name: 'convertPathData',
    desc: 'convert Path data to relative or absolute (whichever is shorter), convert one segment to another, trim useless delimiters, smart rounding, and much more',
    active: true,
  },
  {
    name: 'convertTransform',
    desc: 'collapse multiple transforms into one, convert matrices to the short aliases, and much more',
    active: true,
  },
  {
    name: 'removeUnknownsAndDefaults',
    desc: 'remove unknown elements content and attributes, remove attributes with default values',
    active: true,
  },
  {
    name: 'removeNonInheritableGroupAttrs',
    desc: "remove non-inheritable group's presentation attributes",
    active: true,
  },
  {
    name: 'removeUselessStrokeAndFill',
    desc: 'remove useless stroke and fill attributes',
    active: true,
  },
  {
    name: 'removeUnusedNS',
    desc: 'remove unused namespaces declaration',
    active: true,
  },
  {
    name: 'prefixIds',
    desc: 'prefix IDs and classes with the SVG filename or an arbitrary string',
    active: false,
  },
  {
    name: 'cleanupIDs',
    desc: 'remove unused and minify used IDs',
    active: true,
  },
  {
    name: 'cleanupNumericValues',
    desc: 'round numeric values to the fixed precision, remove default px units',
    active: true,
  },
  {
    name: 'cleanupListOfValues',
    desc: 'round numeric values in attributes that take a list of numbers (like viewBox or enable-background)',
    active: false,
  },
  {
    name: 'moveElemsAttrsToGroup',
    desc: "move elements' attributes to their enclosing group",
    active: true,
  },
  {
    name: 'moveGroupAttrsToElems',
    desc: 'move some group attributes to the contained elements',
    active: true,
  },
  {
    name: 'collapseGroups',
    desc: 'collapse useless groups',
    active: true,
  },
  {
    name: 'removeRasterImages',
    desc: 'remove raster images',
    active: false,
  },
  {
    name: 'mergePaths',
    desc: 'merge multiple Paths into one',
    active: true,
  },
  {
    name: 'convertShapeToPath',
    desc: 'convert some basic shapes to <path>',
    active: true,
  },
  {
    name: 'convertEllipseToCircle',
    desc: 'convert non-eccentric <ellipse> to <circle>',
    active: true,
  },
  {
    name: 'sortAttrs',
    desc: 'sort element attributes for epic readability',
    active: false,
  },
  {
    name: 'sortDefsChildren',
    desc: 'sort children of <defs> in order to improve compression',
    active: true,
  },
  {
    name: 'removeDimensions',
    desc: "remove width/height and add viewBox if it's missing (opposite to removeViewBox, disable it first)",
    active: false,
  },
  {
    name: 'removeAttrs',
    desc: 'remove attributes by pattern',
    active: false,
  },
  {
    name: 'removeAttributesBySelector',
    desc: 'removes attributes of elements that match a CSS selector',
    active: false,
  },
  {
    name: 'removeElementsByAttr',
    desc: 'remove arbitrary elements by ID or className',
    active: false,
  },
  {
    name: 'addClassesToSVGElement',
    desc: 'add classnames to an outer <svg> element',
    active: false,
  },
  {
    name: 'addAttributesToSVGElement',
    desc: 'adds attributes to an outer <svg> element',
    active: false,
  },
  {
    name: 'removeOffCanvasPaths',
    desc: 'removes elements that are drawn outside of the viewbox',
    active: false,
  },
  {
    name: 'removeStyleElement',
    desc: 'remove <style> elements',
    active: false,
  },
  {
    name: 'removeScriptElement',
    desc: 'remove <script> elements',
    active: false,
  },
  {
    name: 'reusePaths',
    desc: 'Find duplicated elements and replace them with links',
    active: false,
  },
];
