const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000
const me = require('./lib/myModule.js')
const _ = require('lodash')

let expression = "(1+2)*3-(4-5)*(6+7)"
console.log(expression);

me.tokenizeExpression(expression)
	.then(x => me.groupNumberTokens(x))
	.then(x => me.toPostfix(x))
	.then(answer => {
		if(_.isEqual(answer,[ '1', '2', '+', '3', '*', '4', '5', '-', '6', '7', '+', '*', '-' ])){
			console.log('CORRECT POSTFIX');
		} else {
			console.log('WRONG POSTFIX');
		}
		return me.evaluate(answer)
	})
	.then(answer => {
		console.log(answer)
	})

app.listen(PORT, ()=>{
	// console.log(`Server running on ${PORT}`);
})
