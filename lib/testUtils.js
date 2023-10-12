(() => {
  'use strict';

  // spy on native methods
  beforeEach(() => {
    spyOn(Array.prototype, 'map');
    spyOn(Array.prototype, 'indexOf');
    spyOn(Array.prototype, 'forEach');
    spyOn(Array.prototype, 'filter');
    spyOn(Array.prototype, 'reduce');
    spyOn(Array.prototype, 'every');
    spyOn(Array.prototype, 'some');
    spyOn(Array.prototype, 'includes');
  });

  // stop spying on native methods
  afterEach(() => {
    Array.prototype.map.calls.reset();
    Array.prototype.indexOf.calls.reset();
    Array.prototype.forEach.calls.reset();
    Array.prototype.filter.calls.reset();
    Array.prototype.reduce.calls.reset();
    Array.prototype.every.calls.reset();
    Array.prototype.some.calls.reset();
    Array.prototype.includes.calls.reset();
  });

  // make sure we are not using native methods
  window.testForNativeMethods = (loscoreMethod) => {
    it('should not use native methods in its implementation', () => {
      loscoreMethod();
      expect(Array.prototype.map).not.toHaveBeenCalled();
      expect(Array.prototype.indexOf).not.toHaveBeenCalled();
      expect(Array.prototype.forEach).not.toHaveBeenCalled();
      expect(Array.prototype.filter).not.toHaveBeenCalled();
      expect(Array.prototype.reduce).not.toHaveBeenCalled();
      expect(Array.prototype.every).not.toHaveBeenCalled();
      expect(Array.prototype.some).not.toHaveBeenCalled();
      expect(Array.prototype.includes).not.toHaveBeenCalled();
    });
  };
})();
