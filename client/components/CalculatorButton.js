import React from 'react'

const CalculatorButton = (props) => {
	return (
		<button
			class="btn btn-default btn-block"
			name="button"
			value={props.value}
			onClick={props.clickHandler}>
			{props.content}
		</button>
	)
}

export default CalculatorButton
