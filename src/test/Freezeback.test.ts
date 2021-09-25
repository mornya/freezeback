import * as Freezeback from '../Freezeback';

beforeEach(() => Freezeback.initialize());
afterEach(() => Freezeback.destroy());

describe('Freezeback module', () => {

  it('Freezeback.initialize', () => {
    expect(window).toBeDefined();

    Freezeback.initialize();

    expect(window.onpopstate).toBeDefined();
  });

  it('Freezeback.destroy', () => {
    expect(window).toBeDefined();

    Freezeback.destroy();

    expect(window.onpopstate).toBeNull();
  });

  it('Freezeback.freeze / Freezeback.isFronzen (without callback)', () => {
    expect(Freezeback.isFrozen()).toBeFalsy();
    expect(Freezeback.isFrozen('TEST')).toBeFalsy();

    Freezeback.freeze('TEST');

    expect(Freezeback.isFrozen('TEST')).toBeTruthy();
  });

  it('Freezeback.freeze / Freezeback.isFronzen (with callback)', () => {
    let hasCalled = false;

    expect(Freezeback.isFrozen('TEST_WITH_CALLBACK')).toBeFalsy();

    Freezeback.freeze('TEST_WITH_CALLBACK', () => (hasCalled = true));

    expect(Freezeback.isFrozen()).toBeTruthy();

    // Emits "popstate" event
    window.dispatchEvent(new Event('popstate'));

    expect(hasCalled).toBeTruthy();
  });

  it('Freezeback.freeze / Freezeback.isFronzen (with multiple freeze)', () => {
    const hasCalled = [false, false, false];

    expect(Freezeback.isFrozen('TEST_WITH_CALLBACK1')).toBeFalsy();
    expect(Freezeback.isFrozen('TEST_WITH_CALLBACK2')).toBeFalsy();
    expect(Freezeback.isFrozen('TEST_WITH_CALLBACK3')).toBeFalsy();

    Freezeback.freeze('TEST_WITH_CALLBACK1', () => (hasCalled[0] = true));
    expect(Freezeback.isFrozen('TEST_WITH_CALLBACK1')).toBeTruthy();

    Freezeback.freeze('TEST_WITH_CALLBACK2', () => (hasCalled[1] = true));
    expect(Freezeback.isFrozen('TEST_WITH_CALLBACK2')).toBeTruthy();

    Freezeback.freeze('TEST_WITH_CALLBACK3', () => (hasCalled[2] = true));
    expect(Freezeback.isFrozen('TEST_WITH_CALLBACK3')).toBeTruthy();

    // emits "popstate" events
    window.dispatchEvent(new Event('popstate'));
    expect(hasCalled[0]).toBeFalsy();
    expect(hasCalled[1]).toBeFalsy();
    expect(hasCalled[2]).toBeTruthy();

    window.dispatchEvent(new Event('popstate'));
    expect(hasCalled[0]).toBeFalsy();
    expect(hasCalled[1]).toBeTruthy();
    expect(hasCalled[2]).toBeTruthy();

    window.dispatchEvent(new Event('popstate'));
    expect(hasCalled[0]).toBeTruthy();
    expect(hasCalled[1]).toBeTruthy();
    expect(hasCalled[2]).toBeTruthy();
  });

  it('Freezeback.unfreeze', () => {
    expect(Freezeback.isFrozen()).toBeFalsy();
    expect(Freezeback.isFrozen('TEST')).toBeFalsy();

    Freezeback.freeze('TEST');
    Freezeback.unfreeze('TEST');

    expect(Freezeback.isFrozen('TEST')).toBeFalsy();
  });

  it('Freezeback.unfreeze (with multiple freeze)', () => {
    expect(Freezeback.isFrozen('TEST1')).toBeFalsy();
    expect(Freezeback.isFrozen('TEST2')).toBeFalsy();
    expect(Freezeback.isFrozen('TEST3')).toBeFalsy();

    Freezeback.freeze('TEST1');
    expect(Freezeback.isFrozen('TEST1')).toBeTruthy();

    Freezeback.freeze('TEST2');
    expect(Freezeback.isFrozen('TEST2')).toBeTruthy();

    Freezeback.freeze('TEST3');
    expect(Freezeback.isFrozen('TEST3')).toBeTruthy();

    // unfreeze only TEST2
    Freezeback.unfreeze('TEST2');

    expect(Freezeback.isFrozen('TEST1')).toBeTruthy();
    expect(Freezeback.isFrozen('TEST2')).toBeFalsy();
    expect(Freezeback.isFrozen('TEST3')).toBeTruthy();

    // emits "popstate" event #1
    window.dispatchEvent(new Event('popstate'));

    expect(Freezeback.isFrozen('TEST1')).toBeTruthy();
    expect(Freezeback.isFrozen('TEST2')).toBeFalsy();
    expect(Freezeback.isFrozen('TEST3')).toBeFalsy();

    // emits "popstate" event #2
    window.dispatchEvent(new Event('popstate'));

    expect(Freezeback.isFrozen('TEST1')).toBeFalsy();
    expect(Freezeback.isFrozen('TEST2')).toBeFalsy();
    expect(Freezeback.isFrozen('TEST3')).toBeFalsy();

    // no frozens finally
    expect(Freezeback.isFrozen()).toBeFalsy();
  });

});
