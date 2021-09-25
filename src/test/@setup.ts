/*
 * @setup
 * The below code helped with mocking get/set of tests in Jest:
 */

Object.defineProperty(window.history, 'go', {
  value: jest.fn(),
  writable: true,
});
