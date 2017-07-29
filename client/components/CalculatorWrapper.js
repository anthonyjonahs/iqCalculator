import React from 'react'

const CalculatorWrapper = (props) => {
	return (
		<div class='row'>
			<div class='col-xs-4 col-sm-4 col-md-4 col-lg-4' style={{background:'lightgrey', margin:'10px'}}>
				{props.children}
			</div>
		</div>
	)
}

export default CalculatorWrapper
