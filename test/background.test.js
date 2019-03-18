import background from '../src/background'

test('should return poczatek if empty string provided', () => {
  expect(background('')).toBe('poczatek');
});