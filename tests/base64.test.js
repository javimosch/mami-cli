const {atob, btoa} = require('../utils')

test('encode and decode a string gives the same value', () => {
	let string = 'hello world'
  expect(atob(btoa(string))).toBe(string);
});