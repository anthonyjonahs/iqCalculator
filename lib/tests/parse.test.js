const parse = require('../parse.js')

describe.only('validate() should ensure:', () => {
	test.skip('first paren is a left paren.', () => {
		expect.assertions(1)
		return expect(parse.validate('')).resolves.toBeFalsy()
	})
	test('all parens close', () => {
		expect.assertions(1)
		return expect(parse.validate('(4-1)/2)')).resolves.toBeFalsy()
	})
	test.skip('NO adjoining left/right parens', () => {
		expect.assertions(1)
		return expect(parse.validate('')).resolves.toBeFalsy()
	})
	test.skip('NO adjoining decimals', () => {
		expect.assertions(1)
		return expect(parse.validate('')).resolves.toBeFalsy()
	})
	test.skip('NO adjoining operators', () => {
		expect.assertions(1)
		return expect(parse.validate('')).resolves.toBeFalsy()
	})
	test.skip('pass a valid expression.', () => {
		expect.assertions(1)
		return expect(parse.validate('(3+52)/55')).resolves.toBeTruthy()
	})
})

describe('splitIntoArray() should:', () => {
	test('split expression into array', () => {
		expect.assertions(1)
		return expect(parse.splitIntoArray('(3+52)/55')).resolves.toEqual(['(','3','+','5','2',')','/','5','5'])
	})
})

describe('groupConsecOperands() should:', () => {
	test('group together consecutive numbers', () => {
		expect.assertions(1)
		return expect(parse.groupConsecOperands(['(','3','+','5','2',')','/','5','5']))
			.resolves.toEqual(['(','3','+','52',')','/','55'])
	})

	test('group together consecutive numbers and decimals', () => {
		expect.assertions(1)
		return expect(parse.groupConsecOperands(['(','3','+','5','2',')','/','5','.','5']))
			.resolves.toEqual(['(','3','+','52',')','/','5.5'])
	})
})

describe('toPostfix() should:', () => {
	test('convert token array to postfix', () => {
		expect.assertions(1)
		return expect(parse.toPostfix(['(','3','+','52',')','/','55'])).resolves.toEqual(['3','52','+','55','/'])
	})
})

describe('evaluatePostfix() should:', () => {
	test('evaluate a postfix expression', () => {
		expect.assertions(1)
		return expect(parse.evaluatePostfix(['3','52','+','55','/'])).resolves.toBe(1)
	})
})

describe('Calculator should:', () => {
	test('evaluate 1+1-1 to be 1', () => {
		expect.assertions(1)
		let expression = '1+1-1'
		let result = parse.splitIntoArray(expression)
			.then(splitExpression => parse.groupConsecOperands(splitExpression))
			.then(tokenizedExpression => parse.toPostfix(tokenizedExpression))
			.then(postfixExpression => parse.evaluatePostfix(postfixExpression))
			.then(result => result)
		return expect(result).resolves.toBe(1)
	})
	test('evaluate 3/(2+1)*44-(2-2)-43 to be 2', () => {
		expect.assertions(1)
		let expression = '3/(2+1)*44-(2-2)-43'
		let result = parse.splitIntoArray(expression)
			.then(splitExpression => parse.groupConsecOperands(splitExpression))
			.then(tokenizedExpression => parse.toPostfix(tokenizedExpression))
			.then(postfixExpression => parse.evaluatePostfix(postfixExpression))
			.then(result => result)
		return expect(result).resolves.toBe(1)
	})
})
