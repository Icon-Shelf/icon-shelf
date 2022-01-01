/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  directories: {
    output: "dist",
    buildResources: "buildResources",
  },
  files: ["packages/**/dist/**"],
  productName: "Icon Shelf",
  appId: "com.IconShelf.app",
  afterSign: "./scripts/Notarize.js",
  mac: {
    target: [
      {
        target: "default",
        arch: ["arm64", "x64"],
      },
    ],
    type: "distribution",
    hardenedRuntime: true,
    entitlements: "buildResources/entitlements.mac.plist",
    entitlementsInherit: "buildResources/entitlements.mac.plist",
    gatekeeperAssess: false,
  },
  dmg: {
    contents: [
      {
        x: 130,
        y: 220,
      },
      {
        x: 410,
        y: 220,
        type: "link",
        path: "/Applications",
      },
    ],
  },
  win: {
    target: ["nsis"],
  },
  linux: {
    target: ["AppImage"],
    category: "Development",
  },
  publish: {
    provider: "github",
    owner: "MrRobz",
    repo: "icon-shelf",
  },
};

module.exports = config;
