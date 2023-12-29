/*
 * Freezeback.ts
 */
export type Option = {
  useHash: boolean;
};
export type OnBackCallback = (state: PopStateEvent['state']) => any;
export type Data = {
  key: string;
  onBack?: OnBackCallback;
};

const defaultOption: Option = {
  useHash: false,
};
let dataStack: Data[] = [];
let isInitialized: boolean = false;

/**
 * initialize
 *
 * @param option {Option | undefined}
 */
export function initialize(option?: Option): void {
  if (!isInitialized && typeof window !== 'undefined') {
    isInitialized = true;

    defaultOption.useHash = option?.useHash ?? defaultOption.useHash;

    window.addEventListener('popstate', popStateHandler, false);
  }
}

/**
 * destroy
 *
 * @param needsUnfreeze {boolean | undefined}
 */
export function destroy(needsUnfreeze: boolean | undefined = true): void {
  if (isInitialized) {
    if (needsUnfreeze && dataStack.length > 0) {
      window.history.go(-dataStack.length);
    }

    window.removeEventListener('popstate', popStateHandler);

    dataStack.length = 0;
    isInitialized = false;
  }
}

/**
 * popStateHandler
 *
 * @private
 * @param event {PopStateEvent}
 */
function popStateHandler(event: PopStateEvent): void {
  if (isFrozen()) {
    const data = dataStack.pop(); // 마지막 스택의 콜백부터 수행

    if (data) {
      if (data.onBack) {
        data.onBack(event.state);
      } else {
        // freeze 되어있으나 콜백이 없다면 뒤로가기 방지
        const hash = defaultOption.useHash ? `${window.location.pathname}#${data.key}` : undefined;

        window.history.pushState({ key: data.key, state: 'block' }, document.title, hash);
      }
    }
  }
}

/**
 * freeze
 *
 * @param key {string}
 * @param onBack {OnBackCallback | undefined}
 */
export function freeze(key: string, onBack?: OnBackCallback): void {
  if (isInitialized) {
    const hash = defaultOption.useHash ? `${window.location.pathname}#${key}` : undefined;

    window.history.pushState({ key, state: 'frozen' }, document.title, hash);
    dataStack.push({ key, onBack });
  }
}

/**
 * unfreeze
 *
 * @param key {string}
 */
export function unfreeze(key: string): void {
  if (isInitialized) {
    // 해당 key로 등록된 콜백 강제 제거시 사용
    if (isFrozen()) {
      dataStack = dataStack.filter((item) => item.key !== key);
    }
    // pushState 제거
    const data = window.history.state as Data;
    if (data.key === key) {
      window.history.back();
    }
  }
}

/**
 * isFrozen
 *
 * @param key {string | undefined}
 * @returns {boolean}
 */
export function isFrozen(key?: string): boolean {
  const has = key ? dataStack.length > 0 && dataStack.some((data) => data.key === key) : dataStack.length > 0;
  return isInitialized ? has : false;
}
