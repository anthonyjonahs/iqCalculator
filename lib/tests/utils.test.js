const utils = require('../utils')

describe('isOperand() should:', () => {
	test('identify 3 as operand', () => {
		expect(utils.isOperand('3')).toBe(true)
	})
	test('identify . as operand', () => {
		expect(utils.isOperand('.')).toBe(true)
	})
	test('identify * as NOT operand', () => {
		expect(utils.isOperand('*')).toBe(false)
	})
	test('identify / as NOT operand', () => {
		expect(utils.isOperand('/')).toBe(false)
	})
	test('identify - as NOT operand', () => {
		expect(utils.isOperand('-')).toBe(false)
	})
	test('identify + as NOT operand', () => {
		expect(utils.isOperand('+')).toBe(false)
	})
})

describe('lastTokenIsOperand() should: ', () => {
	test('return true if last token is operand', () => {
		expect(utils.lastTokenIsOperand(['3','+','2'])).toBeTruthy()
	})
	test('return false if last token is operator', () => {
		expect(utils.lastTokenIsOperand(['3','+'])).toBeFalsy()
	})
});

describe('appendToLast() should:', () => {
	let startingArray = ['3','/','4']
	let character = '8'
	let finalArray = ['3','/','48']

	test('append a character to last entry of array', () => {
		expect(utils.appendToLast(startingArray, character)).toEqual(finalArray)
	})
});
