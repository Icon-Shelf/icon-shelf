/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from 'electron';
const HTMLtoJSX = require('htmltojsx');

/**
 * The "Main World" is the JavaScript context that your main renderer code runs in.
 * By default, the page you load in your renderer executes code in this world.
 *
 * @see https://www.electronjs.org/docs/api/context-bridge
 */

/**
 * After analyzing the `exposeInMainWorld` calls,
 * `packages/preload/exposedInMainWorld.d.ts` file will be generated.
 * It contains all interfaces.
 * `packages/preload/exposedInMainWorld.d.ts` file is required for TS is `renderer`
 *
 * @see https://github.com/cawa-93/dts-for-context-bridge
 */

/**
 * Expose Environment versions.
 * @example
 * console.log( window.versions )
 */
contextBridge.exposeInMainWorld('versions', process.versions);

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send(channel: string, ...args: any[]) {
      ipcRenderer.send(channel, ...args);
    },

    sendSync(channel: string, ...args: any[]) {
      return ipcRenderer.sendSync(channel, ...args);
    },

    on(channel: string, func: (...args: any[]) => any) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    },

    removeListener(channel: string, listener: (...args: any[]) => any) {
      ipcRenderer.removeListener(channel, listener);
    },

    once(channel: string, func: (...args: any[]) => any) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    },
  },
});

const htmlToJsx = new HTMLtoJSX({
  createClass: false,
});

contextBridge.exposeInMainWorld('htmlToJsx', {
  convert(data: any) {
    return htmlToJsx.convert(data);
  },
});
