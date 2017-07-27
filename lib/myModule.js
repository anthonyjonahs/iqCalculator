const _ = require('lodash');

// Operator precedence for Shunting-yard algorith
const precedence = {
	'*': 2,
	'/': 2,
	'+': 1,
	'-': 1
}

// Internal Methods

const isNumberOrPoint = x => !isNaN(x) || x == '.'

const isLastTokenNumberOrPoint = x => isNumberOrPoint(_.last(x))

const appendToLast = (array, character) => {
	let lastIndex = array.length - 1
	let newValue = array[lastIndex].concat(character)
	array[lastIndex] = newValue
	return array
}

// Exported methods

const tokenizeExpression = expression => expression.split('')

const groupNumberTokens = (tokenizedExpressionArray) => {

	return tokenizedExpressionArray.reduce((tokenizedExpression, token, index) => {

		let t = tokenizedExpression

		if (index == 0) {
			return t.concat(token)
		} else if (isNumberOrPoint(token)) {
			return isLastTokenNumberOrPoint(t)	? appendToLast(t, token)
																		: t.concat(token)
		} else {
			return t.concat(token)
		}
	},[])
}

const toPostfix = (tokenizedExpression) => {
	let output 	= [],
			opstack	= []

	let pushToOutput = x => output.push(x)
	let addToOpstack = x => opstack.unshift(x)
	let shiftOpstackToOutput = () => output.push(opstack.shift())

	tokenizedExpression.map((token) => {
		if (isNumberOrPoint(token)) {
			pushToOutput(token)
		} else if (_(opstack).isEmpty()) {
			addToOpstack(token)
		} else {
			if (token == '(') {
				addToOpstack(token)
			} else if (token == ")") {
				while(_(opstack).head() !== '(') {
					shiftOpstackToOutput()
				}
				opstack.shift()
			} else {
				while(!_(opstack).isEmpty() &&
							precedence[_(opstack).head()] >= precedence[token]){
					shiftOpstackToOutput()
				}
				addToOpstack(token)
			}
		}
	})

	return output.concat(opstack)
}

const evaluate = (postfixExpression) => {
	return 'hello'
}

// Promisify exported methods

const tokenizeExpressionPromise = (x) => {
	return new Promise((resolve, reject) => {
		let result = tokenizeExpression(x)
		resolve(result)
	})
}

const groupNumberTokensPromise = (x) => {
	return new Promise((resolve, reject) => {
		let result = groupNumberTokens(x)
		resolve(result)
	})
}

const toPostfixPromise = (x) => {
	return new Promise((resolve, reject) => {
		let result = toPostfix(x)
		resolve(result)
	})
}

const evaluatePromise = (x) => {
	return new Promise((resolve, reject) => {
		let result = evaluate(x)
		resolve(result)
	})
}

// Export public methods as promises

module.exports = {
	tokenizeExpression: tokenizeExpressionPromise,
	groupNumberTokens: groupNumberTokensPromise,
	toPostfix: toPostfixPromise,
	evaluate: evaluatePromise
}
