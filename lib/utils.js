const _ = require('lodash');

// General utility functions used throughout libraries

const isOperand = x => !isNaN(x) || x == '.'

const lastTokenIsOperand = x => isOperand(_.last(x))

const appendToLast = (array, character) => {
	let lastIndex = array.length - 1
	let newValue = array[lastIndex].concat(character)
	array[lastIndex] = newValue
	return array
}

module.exports = {
	isOperand,
	lastTokenIsOperand,
	appendToLast
}
