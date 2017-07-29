import React from 'react'

const CalculatorButton = (props) => {
	return (
		<button class="btn btn-default btn-block" name="button">{props.content}</button>
	)
}

export default CalculatorButton
