const { getFullName, getEmail } = require('./mock');

describe('getFullName', function () {
  test('should return strings', function () {
    expect(getFullName()).toMatch(/^.*$/);
  });

  test('should return unique strings', function () {
    const iterations = 10;
    const uniqueStrings = new Set();

    for (let i = 0; i < iterations; i++) {
      const newString = getFullName();
      expect(uniqueStrings.has(newString)).toBe(false);
      uniqueStrings.add(newString);
    }

    expect(uniqueStrings.size).toBe(iterations);
  });
});

describe('getEmail', function () {
  test('should return strings', () => {
    expect(getEmail()).toMatch(/^[a-zA-z]+@163.com$/);
  });

  test('should return unique strings', function () {
    const iterations = 10;
    const uniqueStrings = new Set();

    for (let i = 0; i < iterations; i++) {
      const newString = getEmail();
      expect(uniqueStrings.has(newString)).toBe(false);
      uniqueStrings.add(newString);
    }

    expect(uniqueStrings.size).toBe(iterations);
  });
});
