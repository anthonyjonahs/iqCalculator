const _ = require('lodash');

// Operator precedence for Shunting-yard algorith
const precedence = {
	'*': 2,
	'/': 2,
	'+': 1,
	'-': 1
}

// Internal Methods

const isOperand = x => !isNaN(x) || x == '.'

const lastTokenIsOperand = x => isOperand(_.last(x))

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
		} else if (isOperand(token)) {
			return lastTokenIsOperand(t)	? appendToLast(t, token)
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
		if (isOperand(token)) {
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

const evaluatePostfix = (postfixExpression) => {
	let operandStack = []
	postfixExpression.map(token => {
		if(isOperand(token)) {
			operandStack.push(token)
		} else {
			let y = parseFloat(operandStack.pop())
			let x = parseFloat(operandStack.pop())

			switch (token) {
				case '+': {
					operandStack.push(x+y)
					break;
				}
				case '-': {
					operandStack.push(x-y)
					break;
				}
				case '*': {
					operandStack.push(x*y)
					break;
				}
				case '/': {
					operandStack.push(x/y)
					break;
				}
			}
		}
	})
	return operandStack[0]
}

// Promisify methods

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

const evaluatePostfixPromise = (x) => {
	return new Promise((resolve, reject) => {
		let result = evaluatePostfix(x)
		resolve(result)
	})
}

// Export methods as promises

module.exports = {
	tokenizeExpression: tokenizeExpressionPromise,
	groupNumberTokens: groupNumberTokensPromise,
	toPostfix: toPostfixPromise,
	evaluatePostfix: evaluatePostfixPromise
}

// Example use
// let expression = "1+2/3-(4-5)*(6+7)/4+5/3-(445-2)"
//
// me.tokenizeExpression(expression)
// 	.then(x => me.groupNumberTokens(x))
// 	.then(x => me.toPostfix(x))
// 	.then(x => me.evaluatePostfix(x))
// 	.then(answer => {
// 		console.log('answer: ', answer);
// 	})
