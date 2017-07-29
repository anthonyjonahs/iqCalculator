import React from 'react';
import parse from '../../lib/parse.js'
import CalculatorButton from './CalculatorButton'

export default class Calculator extends React.Component {
	constructor() {
		super()

		this.state = {
			input:'',
			resultMode: false
		}

		this.handleClick = this.handleClick.bind(this)
		this.clear = this.clear.bind(this)
		this.solve = this.solve.bind(this)
		this.writeToInput = this.writeToInput.bind(this)
		this.clearAndWriteToInput = this.clearAndWriteToInput.bind(this)
		this.handleKeyPress = this.handleKeyPress.bind(this)
	}

	componentWillMount() {
		document.addEventListener('keydown', this.handleKeyPress)
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress)
	}
	solve() {
		console.log('Solving ...');
		let expression = this.state.input
		parse.splitIntoArray(expression)
			.then(splitExpression => parse.groupConsecOperands(splitExpression))
			.then(tokenizedExpression => parse.toPostfix(tokenizedExpression))
			.then(postfixExpression => parse.evaluatePostfix(postfixExpression))
			.then(result => {
				this.setState({ input: result, resultMode: true })
			})
	}

	clear() {
		this.setState({input:'', resultMode: false})
	}

	writeToInput(value) {
		if(this.state.resultMode === true) {
			this.setState({
				input: value,
				resultMode: false
			})
		} else {
			this.setState({
				input: this.state.input.concat(value)
			})
		}
	}

	clearAndWriteToInput(value) {
		this.setState({
			input: value,
			resultMode: false
		})
	}

	handleClick(e) {
		switch (e.target.value) {
			case 'AC': {
				this.clear()
				break
			}
			case '=': {
				this.solve()
				break
			}
			default: {
				this.writeToInput(e.target.value)
			}
		}
	}

	handleKeyPress(event) {
		let validInputs = ['1','2','3','4','5','6','7','8','9','0','.','+','-','/','*','(',')']
		let key = event.key
		console.log(key);
		if (validInputs.includes(key)) {
			this.writeToInput(key)
		} else if (key === 'Enter') {
			this.solve()
		} else if (key === 'Backspace') {
			this.clear()
		}
	}

	render() {
		let buttonRowZeroContent = ['(',')','AC','?']
		let buttonRowOneContent = ['7','8','9','*']
		let buttonRowTwoContent = ['4','5','6','/']
		let buttonRowThreeContent = ['1','2','3','+']
		let buttonRowFourContent = ['0','.','=','-']
		let renderButton = (content,index) => {
			return (
				<div key={index} class="col-xs-1 text-center" >
					<CalculatorButton value={content} content={content} clickHandler={this.handleClick} />
				</div>
			)
		}
		let buttonRowZero = buttonRowZeroContent.map(renderButton)
		let buttonRowOne = buttonRowOneContent.map(renderButton)
		let buttonRowTwo = buttonRowTwoContent.map(renderButton)
		let buttonRowThree = buttonRowThreeContent.map(renderButton)
		let buttonRowFour = buttonRowFourContent.map(renderButton)

		return (
			<div>
				<div class="row">
					<div class="col-xs-4" style={{height:'75px',border:'1px solid black'}}>
						<h2 class="pull-right">{this.state.input}</h2>
					</div>
				</div>
				<div class="row">
					{buttonRowZero}
				</div>
				<div class="row">
					{buttonRowOne}
				</div>
				<div class="row">
					{buttonRowTwo}
				</div>
				<div class="row">
					{buttonRowThree}
				</div>
				<div class="row">
					{buttonRowFour}
				</div>
			</div>
		);
  }
}
