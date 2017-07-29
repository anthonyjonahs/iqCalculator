import React from 'react'

const CalculatorButtonGroup = (props) => {
	return (
		<div class='panel-body' style={{paddingTop:'0px', paddingBottom:'0px'}}>
			{props.children}
		</div>
	)
}

export default CalculatorButtonGroup
