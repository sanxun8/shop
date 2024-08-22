function add(a, b) {
  return a + b;
}

test('add 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});
