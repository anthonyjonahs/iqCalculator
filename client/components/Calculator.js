import React from 'react';
import parse from '../../lib/parse.js'
import CalculatorButton from './CalculatorButton'
import CalculatorWrapper from './CalculatorWrapper'
import CalculatorScreen from './CalculatorScreen'

export default class Calculator extends React.Component {
	constructor() {
		super()

		this.state = {
			input:'',
			showingResult: false
		}

		this.handleClick = this.handleClick.bind(this)
		this.clear = this.clear.bind(this)
		this.solve = this.solve.bind(this)
		this.writeToInput = this.writeToInput.bind(this)
		this.handleKeyPress = this.handleKeyPress.bind(this)
	}

	componentWillMount() {
		document.addEventListener('keydown', this.handleKeyPress)
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress)
	}
	solve() {
		let expression = this.state.input

		parse.splitIntoArray(expression)
			.then(splitExpression => parse.groupConsecOperands(splitExpression))
			.then(tokenizedExpression => parse.toPostfix(tokenizedExpression))
			.then(postfixExpression => parse.evaluatePostfix(postfixExpression))
			.then(result => {
				this.setState({ input: result, showingResult: true })
			})
	}

	clear() {
		this.setState({input:'', showingResult: false})
	}

	writeToInput(value) {
		if(this.state.showingResult === true) {
			this.setState({
				input: value,
				showingResult: false
			})
		} else {
			this.setState({
				input: this.state.input.concat(value)
			})
		}
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

		if (validInputs.includes(key)) {
			this.writeToInput(key)
		} else if (key === 'Enter') {
			this.solve()
		} else if (key === 'Backspace') {
			this.clear()
		}
	}

	render() {
		let renderButtons = (buttons) => {
			return buttons.map((content, index) => {
				return	<div key={index} class="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-center" style={{padding:'0px'}} >
									<CalculatorButton value={content} content={content} clickHandler={this.handleClick} />
								</div>
			})
		}

		let buttonRowOne = renderButtons(['(',')','AC','?'])
		let buttonRowTwo = renderButtons(['7','8','9','*'])
		let buttonRowThree = renderButtons(['4','5','6','/'])
		let buttonRowFour = renderButtons(['1','2','3','+'])
		let buttonRowFive = renderButtons(['0','.','=','-'])

		return (
			<CalculatorWrapper>
				<div class="row">
					<CalculatorScreen value={this.state.input}/>
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
				<div class="row">
					{buttonRowFive}
				</div>
			</CalculatorWrapper>
		);
  }
}
