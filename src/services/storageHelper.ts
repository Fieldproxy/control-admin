module StorageHelper {
  export interface storageItemI {
    key: string;
    value: string;
  }

  export class storageItem {
    key: string;
    value: string;
    constructor(data: storageItemI) {
      this.key = data.key;
      this.value = data.value;
    }
  }

  export class storageWorker {
    localStorageSupported: boolean;

    constructor() {
      this.localStorageSupported =
        typeof window["localStorage"] != "undefined" &&
        window["localStorage"] != null;
    }

    add(key: string, value: any) {
      if (this.localStorageSupported) {
        localStorage.setItem(key, value);
      }
    }

    get(key: string): any {
      if (this.localStorageSupported) {
        var item = localStorage.getItem(key);
        return item;
      }
      return null;
    }

    remove(key: string): void {
      if (this.localStorageSupported) {
        localStorage.removeItem(key);
      }
    }

    clear(): void {
      if (this.localStorageSupported) {
        localStorage.clear();
      }
    }
  }
}

export default StorageHelper;
