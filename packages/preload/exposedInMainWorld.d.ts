interface Window {
  /**
   * Expose Environment versions.
   * @example
   * console.log( window.versions )
   */
  readonly versions: NodeJS.ProcessVersions;
  readonly electron: {
    ipcRenderer: {
      send(channel: string, ...args: any[]): void;
      sendSync(channel: string, ...args: any[]): any;
      on(channel: string, func: (...args: any[]) => any): void;
      removeListener(channel: string, listener: (...args: any[]) => any): void;
      once(channel: string, func: (...args: any[]) => any): void;
    };
  };
  readonly htmlToJsx: { convert(data: any): any };
}
