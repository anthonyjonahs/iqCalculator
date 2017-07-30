import React from 'react'

const CalculatorScreen = (props) => {

	return (
		<div class='panel-heading' style={{minHeight:'100px',overflow:'auto'}}>
			{!props.valid &&
				<div>
					<p class='pull-right' style={{marginBottom:'0px',color:'red'}}>
						<strong>Oops! Bad input.</strong>
					</p><br/>
				</div>
			}
			<h2 class='pull-right' style={{maxWidth:'100%',marginTop:'0px',wordBreak:'break-all'}}>{props.value}</h2>
		</div>
	)
}

export default CalculatorScreen

CalculatorButton.propTypes = {
	valid: Proptypes.bool.isRequired,
	value: Proptypes.string
}
