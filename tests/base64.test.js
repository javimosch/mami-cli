const {atob, btoa} = require('../utils')

test('encode and decode a string gives the same value', () => {
	let string = 'hello world'

	if(false){
		console.log('here')
	}else{
		console.log('there')
	}

  expect(atob(btoa(string))).toBe(string);
});