import React from 'react'

const CalculatorScreen = (props) => {
	let message = false ? 'Valid Input' : 'Error: bad input'

	return (
		<div class='panel-heading' style={{minHeight:'100px', overflow:'auto'}}>
			<p class='pull-right' style={{marginBottom:'0px'}}>{message}</p><br/>
			<h2 class='pull-right' style={{maxWidth:'100%',marginTop:'0px',wordBreak: 'break-all'}}>{props.value}</h2>
		</div>
	)
}

export default CalculatorScreen
