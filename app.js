const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000
const me = require('./lib/myModule.js')
const _ = require('lodash')

app.use(express.static(__dirname + '/Views'))

app.get('/', (req, res) => {
	res.sendFile('index.html')
})

app.listen(PORT, ()=>{
	// console.log(`Server running on ${PORT}`);
})
