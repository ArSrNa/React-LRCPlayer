import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>");

(globalThis as any).window = dom.window;
(globalThis as any).document = dom.window.document;
(globalThis as any).navigator = {
  userAgent: "node.js",
};


// Mock requestAnimationFrame and cancelAnimationFrame
(globalThis as any).requestAnimationFrame = (cb: FrameRequestCallback) => {
  return setTimeout(() => cb(Date.now()), 0) as unknown as number;
};
/**
 * 清除指定定时器
 * @param {number} id - 要清除的定时器ID
 */
(globalThis as any).cancelAnimationFrame = (id: number) => {
  clearTimeout(id);
};
