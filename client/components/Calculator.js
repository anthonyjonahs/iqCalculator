import React from 'react';
import parse from '../../lib/parse.js'
import _ from 'lodash'
import CalculatorButton from './CalculatorButton'
import CalculatorButtonGroup from './CalculatorButtonGroup'
import CalculatorFooter from './CalculatorFooter'
import CalculatorScreen from './CalculatorScreen'
import CalculatorWrapper from './CalculatorWrapper'

export default class Calculator extends React.Component {
	constructor() {
		super()

		this.state = {
			input:'',
			showingResult: false,
			valid: true
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
				// result = _.truncate(result, {length:24, omission:''})
				this.setState({
					input: result,
					showingResult: true
				})
			})
			.catch(err => alert(err))
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
		switch (e.currentTarget.value) {
			case 'AC': {
				this.clear()
				break
			}
			case '=': {
				this.solve()
				break
			}
			default: {
				this.writeToInput(e.currentTarget.value)
			}
		}
	}

	handleKeyPress(event) {
		let validInputs = ['1','2','3','4','5','6','7','8','9','0','.','+','-','/','*','(',')']
		let key = event.key
		let isValidInput = key => validInputs.includes(key)

		if (isValidInput(key)) {
			this.writeToInput(key)
		} else if (key === 'Enter') {
			event.preventDefault() //Avoid unwanted click event if there is a focused calculator button.
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

		let buttons = [
			<div class="row">{renderButtons(['(',')','AC'])}</div>,
			<div class='row'>{renderButtons(['7','8','9','*'])}</div>,
			<div class='row'>{renderButtons(['4','5','6','/'])}</div>,
			<div class='row'>{renderButtons(['1','2','3','+'])}</div>,
			<div class='row'>{renderButtons(['0','.','=','-'])}</div>
		]

		return (
			<CalculatorWrapper>
				<CalculatorScreen value={this.state.input} valid={this.state.valid}/>
				<CalculatorButtonGroup>
					{buttons}
				</CalculatorButtonGroup>
				<CalculatorFooter />
			</CalculatorWrapper>
		);
  }
}
