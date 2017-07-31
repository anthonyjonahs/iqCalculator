const _ = require('lodash')
const utils = require('./utils');

// Operator precedence for Shunting-yard algorith
const precedence = {
	'*': 2,
	'/': 2,
	'+': 1,
	'-': 1
}

/**
	*	Splits string expression in array:
	*
	*	'(3+14.2)*5' => ['(','3','+','1','4','.','2',')','*','5']
	*/
const splitIntoArray = (expression) => {
	return new Promise((resolve, reject) => {
		if (typeof expression === 'number') {
			expression = expression.toString()
		}
		let result = expression.split('')
		resolve(result)
	})
}

/**
	*	Groups together consecutive operands:
	*
	*	['(','3','+','1','4','.','2',')','*','5'] => ['(','3','+','14.2',')','*','5']
	*/
const groupConsecOperands = (tokenizedExpressionArray) => {
	return new Promise((resolve, reject) => {
		let result = tokenizedExpressionArray.reduce((tokenizedExpression, token, index) => {
			let t = tokenizedExpression

			if (index == 0) {
				return t.concat(token)
			} else if (utils.isOperand(token)) {
				return utils.lastTokenIsOperand(t) ? utils.appendToLast(t, token) : t.concat(token)
			} else {
				return t.concat(token)
			}
		},[])

		resolve(result)
	})

}

/**
	*	Converts infix expressin array to postfix:
	*
	*	['(','3','+','14.2',')','*','5'] => [ '3', '14.2', '+', '5', '*' ]
	*/
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

/**
	*	Evaluates postfix array and returns the result:
	*
	*	[ '3', '14.2', '+', '5', '*' ] => 86
	*/
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
	splitIntoArray,
	groupConsecOperands,
	toPostfix,
	evaluatePostfix
}
