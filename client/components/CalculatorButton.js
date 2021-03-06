import React from 'react'
import PropTypes from 'prop-types'

const CalculatorButton = (props) => {
	return (
		<button
			class="btn btn-default"
			style={{width:'100%', height:'6vw', minHeight:'50px', margin:'1px'}}
			name="button"
			value={props.value}
			onClick={props.clickHandler}>
				<h4>{props.content}</h4>
		</button>
	)
}

export default CalculatorButton

CalculatorButton.propTypes = {
	value: PropTypes.string,
	content: PropTypes.string
}
