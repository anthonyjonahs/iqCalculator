import React from 'react'

const CalculatorButton = (props) => {
	return (
		<button
			class="btn btn-default"
			style={{width:'100%', height:'5vw', minHeight:'30px', margin:'1px'}}
			name="button"
			value={props.value}
			onClick={props.clickHandler}>
			{props.content}
		</button>
	)
}

export default CalculatorButton
