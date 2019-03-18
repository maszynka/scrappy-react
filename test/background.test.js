const background = require('../build/background.js')

test('should return poczatek if empty string provided', () => {
  expect(background('')).toBe('poczatek');
});