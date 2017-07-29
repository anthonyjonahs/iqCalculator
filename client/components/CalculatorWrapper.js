import React from 'react'

const CalculatorWrapper = (props) => {
	return (
		<div class='row'>
			<div class='col-xs-12 col-xs-offset-0 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4' style={{marginTop:'5vw'}}>
				{props.children}
			</div>
		</div>
	)
}

export default CalculatorWrapper
