import React from 'react';
import CalculatorButton from './CalculatorButton'

export default class Calculator extends React.Component {
	constructor() {
		super()

		this.state = {
			input:''
		}
	}

	render() {
		return (
			<div>
				<div class="row">
					<div class="col-xs-4" style={{border:'1px solid black'}}>
						<h2 class="pull-right">{this.state.input}</h2>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-1 text-center">
						<CalculatorButton content='1' />
					</div>
					<div class="col-xs-1 text-center">
						<CalculatorButton content='2' />
					</div>
					<div class="col-xs-1 text-center">
						<CalculatorButton content='3' />
					</div>
					<div class="col-xs-1 text-center">
						<CalculatorButton content='4' />
					</div>
				</div>
			</div>
		);
  }
}
