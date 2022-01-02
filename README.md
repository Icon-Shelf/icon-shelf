<p align="center">
  <a href="https://icon-shelf.github.io">
    <img src="buildResources/icons/128x128.png" alt="Icon Shelf logo" width="96">
  </a>
</p>

<h1 align="center">Icon Shelf</h1>
<h3 align="center">Fantastic icon manager for web developers.</h3>

<p align="center">
  <br>
  <a href="#features">Features</a>
  .
  <a href="https://github.com/Icon-Shelf/icon-shelf/projects/3">Road Map</a>
  .
  <a href="#call_me_hand-development">Development</a>
  .
  <a href="#computer-installation">Installation</a>
  .
  <a href="#shield-privacy">Privacy</a>
</p>

<p align="center">
   <a href="https://snapcraft.io/pomatez">
      <image src="https://img.shields.io/github/downloads/Icon-Shelf/icon-shelf/total" alt="Github downloads" />
   </a>
  
   <a href="https://github.com/Icon-Shelf/icon-shelf/blob/main/LICENSE">
      <image alt="license" src="https://img.shields.io/github/license/Icon-Shelf/icon-shelf">
   </a>
</p>

<img width="1554" alt="icon-shelf" src="https://user-images.githubusercontent.com/21201812/134767938-7f30e3b2-2ce1-4ed6-8a61-5df0607fe858.png">

Icon Shelf is a **free SVG icon manager** for developers.

Working on a frontend project and struggling with finding your icons and importing them. Worry not Icon shelf is here to help you.
Link the icons folder of your project to Icon Shelf and see all your icons in an easily previewable manner. And with a click of a button copy to clipboard the import statement for the icon.

<br>

## Features

⭐️ Easy to view icon previews

⭐️ Searchable icon library

⭐️ File-based (adding, deleting, modifying icons in app get reflected in file-system as well.)

⭐️ Customize icon import statement texts. Copy as react, vue, ember etc

⭐️ Cross platform: Windows, Mac and Linux

<br>

## :call_me_hand: Development

This app is built using [React](https://reactjs.org/), [Electron](https://www.electronjs.org/), and [Typescript](https://www.typescriptlang.org/). We use [Vite](https://vitejs.dev/) for bundling and building.

Some of the main packages that we use are:

- CSS - [tailwindcss](https://tailwindcss.com/)
- caching - [react-query](https://react-query.tanstack.com/)
- editor - [codemirror](https://codemirror.net/6/)
- db - [dexie](https://dexie.org/)

### :zap: Quick Setup

1. Install all app dependencies.

   ```sh
   npm install
   ```

2. Start the development.

   ```sh
   npm run watch
   ```

### Project Structure

The structure of this template is very similar to the structure of a monorepo.

The entire source code of the program is divided into three modules (packages) that are bundled each independently:

- [`packages/main`](packages/main)
  Electron [**main script**](https://www.electronjs.org/docs/tutorial/quick-start#create-the-main-script-file).
- [`packages/preload`](packages/preload)
  Used in `BrowserWindow.webPreferences.preload`. See [Checklist: Security Recommendations](https://www.electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content).
- [`packages/renderer`](packages/renderer)
  Electron [**web page**](https://www.electronjs.org/docs/tutorial/quick-start#create-a-web-page).

### Build web resources

Packages `main` and `preload` are built in [library mode](https://vitejs.dev/guide/build.html#library-mode) as it is a simple javascript.
`renderer` package build as regular web app.

The build of web resources is performed in the [`scripts/build.js`](scripts/build.js). Its analogue is a sequential call to `vite build` for each package.

<br>

### 🛠 Building for Production

1. Package.

   ```sh
   npm run compile
   ```

2. A dist folder would be created. In which your packaged app would be present.

<br>

### Working with dependencies

According to [Electron's security guidelines](https://www.electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content), Node.js integration is disabled for remote content. This means that **you cannot call any Node.js api in the `packages/renderer` directly**.

But **you can still use the imports in the source code**.

The fact is that Vite analyze your code, finds all the imported dependencies, applies tree shaking, optimization to them and bundle them inside the output source files. So when you write something like that:

```ts
// source.ts
import { createApp } from 'vue';
createApp();
```

It turns into:

```js
// bundle.js
function createApp() { ... }
createApp()
```

And there are really no imports left in runtime.

**But it doesn't always work**. Vite is not able to bundle Node built-in modules, or some special modules because of their architecture, or Electron itself.

Modules that Vite is unable to bundle are forced to be supplied as `external`. External modules are not optimized and their imports remain in runtime.
So when you write something like that:

```ts
// source.ts
import { writeFile } from 'fs';
writeFile();
```

It will remain as is and lead to runtime-error because Electron **cannot import modules from `node_modules`** in the renderer.

```js
// bundle.js
import { writeFile } from 'fs'; // TypeError: Failed to resolve module specifier "fs". Relative references must start with either "/", "./", or "../".
writeFile();
```

### Using external modules in renderer

To use external modules in Renderer you **must** describe the interface in the `packages/preload` where Node.js api is allowed:

```ts
// packages/preload/src/index.ts
import type { BinaryLike } from 'crypto';
import { createHash } from 'crypto';

contextBridge.exposeInMainWorld('nodeCrypto', {
  sha256sum(data: BinaryLike) {
    const hash = createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
  },
});
```

The [`dts-cb`](https://github.com/cawa-93/dts-for-context-bridge) utility will automatically generate an interface for TS:

```ts
// packages/preload/exposedInMainWorld.d.ts
interface Window {
  readonly nodeCrypto: { sha256sum(data: import('crypto').BinaryLike): string };
}
```

And now, you can safely use the registered method:

```ts
// packages/renderer/src/App.vue
window.nodeCrypto.sha256sum('data');
```

[Read more about Security Considerations](https://www.electronjs.org/docs/tutorial/context-isolation#security-considerations).

<br>

## :computer: Installation

Available for Windows, macOS, and Linux.

Download the latest version from the [Releases Page](https://github.com/MrRobz/icon-shelf/releases/latest) or from the :point_right: [Download Page](https://icon-shelf.github.io/download) .

Please consider starring this project to show your :blue_heart: and support.

<br>

## :shield: Privacy

This app has analytics that will track number of users only.

<br>

## Contributing

See [Contributing Guide.](https://github.com/Icon-Shelf/icon-shelf/blob/main/contributing.md)

Please adhere to this project's [code of conduct](https://github.com/Icon-Shelf/icon-shelf/blob/main/CODE_OF_CONDUCT.md).
