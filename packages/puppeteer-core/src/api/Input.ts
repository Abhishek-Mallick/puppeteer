/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Protocol} from 'devtools-protocol';

import {KeyInput} from '../common/USKeyboardLayout.js';

import {Point} from './ElementHandle.js';

/**
 * @public
 */
export interface KeyDownOptions {
  text?: string;
  commands?: string[];
}

/**
 * @public
 */
export interface TypeOptions {
  delay?: number;
}

/**
 * @public
 */
export type KeyPressOptions = KeyDownOptions & TypeOptions;

/**
 * Keyboard provides an api for managing a virtual keyboard.
 * The high level api is {@link Keyboard."type"},
 * which takes raw characters and generates proper keydown, keypress/input,
 * and keyup events on your page.
 *
 * @remarks
 * For finer control, you can use {@link Keyboard.down},
 * {@link Keyboard.up}, and {@link Keyboard.sendCharacter}
 * to manually fire events as if they were generated from a real keyboard.
 *
 * On macOS, keyboard shortcuts like `⌘ A` -\> Select All do not work.
 * See {@link https://github.com/puppeteer/puppeteer/issues/1313 | #1313}.
 *
 * @example
 * An example of holding down `Shift` in order to select and delete some text:
 *
 * ```ts
 * await page.keyboard.type('Hello World!');
 * await page.keyboard.press('ArrowLeft');
 *
 * await page.keyboard.down('Shift');
 * for (let i = 0; i < ' World'.length; i++)
 *   await page.keyboard.press('ArrowLeft');
 * await page.keyboard.up('Shift');
 *
 * await page.keyboard.press('Backspace');
 * // Result text will end up saying 'Hello!'
 * ```
 *
 * @example
 * An example of pressing `A`
 *
 * ```ts
 * await page.keyboard.down('Shift');
 * await page.keyboard.press('KeyA');
 * await page.keyboard.up('Shift');
 * ```
 *
 * @public
 */
export class Keyboard {
  /**
   * @internal
   */
  constructor() {}

  /**
   * Dispatches a `keydown` event.
   *
   * @remarks
   * If `key` is a single character and no modifier keys besides `Shift`
   * are being held down, a `keypress`/`input` event will also generated.
   * The `text` option can be specified to force an input event to be generated.
   * If `key` is a modifier key, `Shift`, `Meta`, `Control`, or `Alt`,
   * subsequent key presses will be sent with that modifier active.
   * To release the modifier key, use {@link Keyboard.up}.
   *
   * After the key is pressed once, subsequent calls to
   * {@link Keyboard.down} will have
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat | repeat}
   * set to true. To release the key, use {@link Keyboard.up}.
   *
   * Modifier keys DO influence {@link Keyboard.down}.
   * Holding down `Shift` will type the text in upper case.
   *
   * @param key - Name of key to press, such as `ArrowLeft`.
   * See {@link KeyInput} for a list of all key names.
   *
   * @param options - An object of options. Accepts text which, if specified,
   * generates an input event with this text. Accepts commands which, if specified,
   * is the commands of keyboard shortcuts,
   * see {@link https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/editing/commands/editor_command_names.h | Chromium Source Code} for valid command names.
   */
  async down(key: KeyInput, options?: Readonly<KeyDownOptions>): Promise<void>;
  async down(): Promise<void> {
    throw new Error('Not implemented');
  }

  /**
   * Dispatches a `keyup` event.
   *
   * @param key - Name of key to release, such as `ArrowLeft`.
   * See {@link KeyInput | KeyInput}
   * for a list of all key names.
   */
  async up(key: KeyInput): Promise<void>;
  async up(): Promise<void> {
    throw new Error('Not implemented');
  }

  /**
   * Dispatches a `keypress` and `input` event.
   * This does not send a `keydown` or `keyup` event.
   *
   * @remarks
   * Modifier keys DO NOT effect {@link Keyboard.sendCharacter | Keyboard.sendCharacter}.
   * Holding down `Shift` will not type the text in upper case.
   *
   * @example
   *
   * ```ts
   * page.keyboard.sendCharacter('嗨');
   * ```
   *
   * @param char - Character to send into the page.
   */
  async sendCharacter(char: string): Promise<void>;
  async sendCharacter(): Promise<void> {
    throw new Error('Not implemented');
  }

  /**
   * Sends a `keydown`, `keypress`/`input`,
   * and `keyup` event for each character in the text.
   *
   * @remarks
   * To press a special key, like `Control` or `ArrowDown`,
   * use {@link Keyboard.press}.
   *
   * Modifier keys DO NOT effect `keyboard.type`.
   * Holding down `Shift` will not type the text in upper case.
   *
   * @example
   *
   * ```ts
   * await page.keyboard.type('Hello'); // Types instantly
   * await page.keyboard.type('World', {delay: 100}); // Types slower, like a user
   * ```
   *
   * @param text - A text to type into a focused element.
   * @param options - An object of options. Accepts delay which,
   * if specified, is the time to wait between `keydown` and `keyup` in milliseconds.
   * Defaults to 0.
   */
  async type(text: string, options?: Readonly<TypeOptions>): Promise<void>;
  async type(): Promise<void> {
    throw new Error('Not implemented');
  }

  /**
   * Shortcut for {@link Keyboard.down}
   * and {@link Keyboard.up}.
   *
   * @remarks
   * If `key` is a single character and no modifier keys besides `Shift`
   * are being held down, a `keypress`/`input` event will also generated.
   * The `text` option can be specified to force an input event to be generated.
   *
   * Modifier keys DO effect {@link Keyboard.press}.
   * Holding down `Shift` will type the text in upper case.
   *
   * @param key - Name of key to press, such as `ArrowLeft`.
   * See {@link KeyInput} for a list of all key names.
   *
   * @param options - An object of options. Accepts text which, if specified,
   * generates an input event with this text. Accepts delay which,
   * if specified, is the time to wait between `keydown` and `keyup` in milliseconds.
   * Defaults to 0. Accepts commands which, if specified,
   * is the commands of keyboard shortcuts,
   * see {@link https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/editing/commands/editor_command_names.h | Chromium Source Code} for valid command names.
   */
  async press(
    key: KeyInput,
    options?: Readonly<KeyPressOptions>
  ): Promise<void>;
  async press(): Promise<void> {
    throw new Error('Not implemented');
  }
}

/**
 * @public
 */
export interface MouseOptions {
  /**
   * Determines which button will be pressed.
   *
   * @defaultValue `'left'`
   */
  button?: MouseButton;
  /**
   * @deprecated Use {@link MouseClickOptions.count}.
   *
   * Determines the click count for the mouse event. This does not perform
   * multiple clicks.
   *
   * @defaultValue `1`
   */
  clickCount?: number;
}

/**
 * @public
 */
export interface MouseClickOptions extends MouseOptions {
  /**
   * Time (in ms) to delay the mouse release after the mouse press.
   */
  delay?: number;
  /**
   * Number of clicks to perform.
   *
   * @defaultValue `1`
   */
  count?: number;
}

/**
 * @public
 */
export interface MouseWheelOptions {
  deltaX?: number;
  deltaY?: number;
}

/**
 * @public
 */
export interface MouseMoveOptions {
  /**
   * Determines the number of movements to make from the current mouse position
   * to the new one.
   *
   * @defaultValue `1`
   */
  steps?: number;
}

/**
 * Enum of valid mouse buttons.
 *
 * @public
 */
export const MouseButton = Object.freeze({
  Left: 'left',
  Right: 'right',
  Middle: 'middle',
  Back: 'back',
  Forward: 'forward',
}) satisfies Record<string, Protocol.Input.MouseButton>;

/**
 * @public
 */
export type MouseButton = (typeof MouseButton)[keyof typeof MouseButton];

/**
 * The Mouse class operates in main-frame CSS pixels
 * relative to the top-left corner of the viewport.
 * @remarks
 * Every `page` object has its own Mouse, accessible with [`page.mouse`](#pagemouse).
 *
 * @example
 *
 * ```ts
 * // Using ‘page.mouse’ to trace a 100x100 square.
 * await page.mouse.move(0, 0);
 * await page.mouse.down();
 * await page.mouse.move(0, 100);
 * await page.mouse.move(100, 100);
 * await page.mouse.move(100, 0);
 * await page.mouse.move(0, 0);
 * await page.mouse.up();
 * ```
 *
 * **Note**: The mouse events trigger synthetic `MouseEvent`s.
 * This means that it does not fully replicate the functionality of what a normal user
 * would be able to do with their mouse.
 *
 * For example, dragging and selecting text is not possible using `page.mouse`.
 * Instead, you can use the {@link https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/getSelection | `DocumentOrShadowRoot.getSelection()`} functionality implemented in the platform.
 *
 * @example
 * For example, if you want to select all content between nodes:
 *
 * ```ts
 * await page.evaluate(
 *   (from, to) => {
 *     const selection = from.getRootNode().getSelection();
 *     const range = document.createRange();
 *     range.setStartBefore(from);
 *     range.setEndAfter(to);
 *     selection.removeAllRanges();
 *     selection.addRange(range);
 *   },
 *   fromJSHandle,
 *   toJSHandle
 * );
 * ```
 *
 * If you then would want to copy-paste your selection, you can use the clipboard api:
 *
 * ```ts
 * // The clipboard api does not allow you to copy, unless the tab is focused.
 * await page.bringToFront();
 * await page.evaluate(() => {
 *   // Copy the selected content to the clipboard
 *   document.execCommand('copy');
 *   // Obtain the content of the clipboard as a string
 *   return navigator.clipboard.readText();
 * });
 * ```
 *
 * **Note**: If you want access to the clipboard API,
 * you have to give it permission to do so:
 *
 * ```ts
 * await browser
 *   .defaultBrowserContext()
 *   .overridePermissions('<your origin>', [
 *     'clipboard-read',
 *     'clipboard-write',
 *   ]);
 * ```
 *
 * @public
 */
export class Mouse {
  /**
   * @internal
   */
  constructor() {}

  /**
   * Resets the mouse to the default state: No buttons pressed; position at
   * (0,0).
   */
  async reset(): Promise<void> {
    throw new Error('Not implemented');
  }

  /**
   * Moves the mouse to the given coordinate.
   *
   * @param x - Horizontal position of the mouse.
   * @param y - Vertical position of the mouse.
   * @param options - Options to configure behavior.
   */
  async move(
    x: number,
    y: number,
    options?: Readonly<MouseMoveOptions>
  ): Promise<void>;
  async move(): Promise<void> {
    throw new Error('Not implemented');
  }

  /**
   * Presses the mouse.
   *
   * @param options - Options to configure behavior.
   */
  async down(options?: Readonly<MouseOptions>): Promise<void>;
  async down(): Promise<void> {
    throw new Error('Not implemented');
  }

  /**
   * Releases the mouse.
   *
   * @param options - Options to configure behavior.
   */
  async up(options?: Readonly<MouseOptions>): Promise<void>;
  async up(): Promise<void> {
    throw new Error('Not implemented');
  }

  /**
   * Shortcut for `mouse.move`, `mouse.down` and `mouse.up`.
   *
   * @param x - Horizontal position of the mouse.
   * @param y - Vertical position of the mouse.
   * @param options - Options to configure behavior.
   */
  async click(
    x: number,
    y: number,
    options?: Readonly<MouseClickOptions>
  ): Promise<void>;
  async click(): Promise<void> {
    throw new Error('Not implemented');
  }

  /**
   * Dispatches a `mousewheel` event.
   * @param options - Optional: `MouseWheelOptions`.
   *
   * @example
   * An example of zooming into an element:
   *
   * ```ts
   * await page.goto(
   *   'https://mdn.mozillademos.org/en-US/docs/Web/API/Element/wheel_event$samples/Scaling_an_element_via_the_wheel?revision=1587366'
   * );
   *
   * const elem = await page.$('div');
   * const boundingBox = await elem.boundingBox();
   * await page.mouse.move(
   *   boundingBox.x + boundingBox.width / 2,
   *   boundingBox.y + boundingBox.height / 2
   * );
   *
   * await page.mouse.wheel({deltaY: -100});
   * ```
   */
  async wheel(options?: Readonly<MouseWheelOptions>): Promise<void>;
  async wheel(): Promise<void> {
    throw new Error('Not implemented');
  }

  /**
   * Dispatches a `drag` event.
   * @param start - starting point for drag
   * @param target - point to drag to
   */
  async drag(start: Point, target: Point): Promise<Protocol.Input.DragData>;
  async drag(): Promise<Protocol.Input.DragData> {
    throw new Error('Not implemented');
  }

  /**
   * Dispatches a `dragenter` event.
   * @param target - point for emitting `dragenter` event
   * @param data - drag data containing items and operations mask
   */
  async dragEnter(target: Point, data: Protocol.Input.DragData): Promise<void>;
  async dragEnter(): Promise<void> {
    throw new Error('Not implemented');
  }

  /**
   * Dispatches a `dragover` event.
   * @param target - point for emitting `dragover` event
   * @param data - drag data containing items and operations mask
   */
  async dragOver(target: Point, data: Protocol.Input.DragData): Promise<void>;
  async dragOver(): Promise<void> {
    throw new Error('Not implemented');
  }

  /**
   * Performs a dragenter, dragover, and drop in sequence.
   * @param target - point to drop on
   * @param data - drag data containing items and operations mask
   */
  async drop(target: Point, data: Protocol.Input.DragData): Promise<void>;
  async drop(): Promise<void> {
    throw new Error('Not implemented');
  }

  /**
   * Performs a drag, dragenter, dragover, and drop in sequence.
   * @param start - point to drag from
   * @param target - point to drop on
   * @param options - An object of options. Accepts delay which,
   * if specified, is the time to wait between `dragover` and `drop` in milliseconds.
   * Defaults to 0.
   */
  async dragAndDrop(
    start: Point,
    target: Point,
    options?: {delay?: number}
  ): Promise<void>;
  async dragAndDrop(): Promise<void> {
    throw new Error('Not implemented');
  }
}

/**
 * The Touchscreen class exposes touchscreen events.
 * @public
 */
export class Touchscreen {
  /**
   * @internal
   */
  constructor() {}

  /**
   * Dispatches a `touchstart` and `touchend` event.
   * @param x - Horizontal position of the tap.
   * @param y - Vertical position of the tap.
   */
  async tap(x: number, y: number): Promise<void>;
  async tap(): Promise<void> {
    throw new Error('Not implemented');
  }

  /**
   * Dispatches a `touchstart` event.
   * @param x - Horizontal position of the tap.
   * @param y - Vertical position of the tap.
   */
  async touchStart(x: number, y: number): Promise<void>;
  async touchStart(): Promise<void> {
    throw new Error('Not implemented');
  }

  /**
   * Dispatches a `touchMove` event.
   * @param x - Horizontal position of the move.
   * @param y - Vertical position of the move.
   */
  async touchMove(x: number, y: number): Promise<void>;
  async touchMove(): Promise<void> {
    throw new Error('Not implemented');
  }

  /**
   * Dispatches a `touchend` event.
   */
  async touchEnd(): Promise<void>;
  async touchEnd(): Promise<void> {
    throw new Error('Not implemented');
  }
}