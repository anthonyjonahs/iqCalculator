const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000
const parse = require('./lib/parse.js')
const _ = require('lodash')

app.use(express.static(__dirname + '/client'))
app.use(express.static(__dirname + '/dist'))

app.get('/', (req, res) => {
	res.sendFile('index.html')
})

app.listen(PORT, ()=>{
	console.log(`Server running on ${PORT}`);
})
