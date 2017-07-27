const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000
const me = require('./lib/myModule.js')
const _ = require('lodash')

let expression = "(1+2)/3-(4-5)*(6+7)/4+5/3-(445-2)"
console.log(expression);

me.tokenizeExpression(expression)
	.then(x => me.groupNumberTokens(x))
	.then(x => me.toPostfix(x))
	.then(x => me.evaluatePostfix(x))
	.then(answer => {
		console.log('answer: ', answer);
	})

app.listen(PORT, ()=>{
	// console.log(`Server running on ${PORT}`);
})
