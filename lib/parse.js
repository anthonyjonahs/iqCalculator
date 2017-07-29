const _ = require('lodash')
const utils = require('./utils');

// Operator precedence for Shunting-yard algorith
const precedence = {
	'*': 2,
	'/': 2,
	'+': 1,
	'-': 1
}

// Exported methods
const validate = (expression) => {
	let includesLeftParen = str => str.includes('(')
	let includesRightParen = str => str.includes(')')
	let countLeftParens = str => str.match(/\(/g).length
	let countRightParens = str => str.match(/\)/g).length

	return new Promise((resolve, reject) => {
		let valid = true
		if(countRightParens(expression) !== countLeftParens(expression)) {
			// fails if only one paren
			valid = false
		}
		valid ? resolve(true) : resolve(false)
	})
}


const splitIntoArray = (expression) => {
	return new Promise((resolve, reject) => {
		 let result = expression.split('')
		 resolve(result)
	})
}

const groupConsecOperands = (tokenizedExpressionArray) => {
	return new Promise((resolve, reject) => {
		let result = tokenizedExpressionArray.reduce((tokenizedExpression, token, index) => {

			let t = tokenizedExpression

			if (index == 0) {
				return t.concat(token)
			} else if (utils.isOperand(token)) {
				return utils.lastTokenIsOperand(t)	? utils.appendToLast(t, token)
				: t.concat(token)
			} else {
				return t.concat(token)
			}
		},[])

		resolve(result)
	})

}

const toPostfix = (tokenizedExpression) => {
	return new Promise((resolve, reject) => {
		let output 	= [],
		opstack	= []

		let pushToOutput = x => output.push(x)
		let addToOpstack = x => opstack.unshift(x)
		let shiftOpstackToOutput = () => output.push(opstack.shift())

		tokenizedExpression.map((token) => {
			if (utils.isOperand(token)) {
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

		resolve(output.concat(opstack))
	})
}

const evaluatePostfix = (postfixExpression) => {
	return new Promise((resolve, reject) => {
		let operandStack = []
		postfixExpression.map(token => {
			if(utils.isOperand(token)) {
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
		resolve(operandStack[0])
	})
}

module.exports = {
	validate,
	splitIntoArray,
	groupConsecOperands,
	toPostfix,
	evaluatePostfix
}
