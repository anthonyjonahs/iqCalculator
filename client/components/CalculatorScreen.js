import React from 'react'

const CalculatorScreen = (props) => {
	return (
		<div class="col-md-12" style={{height:'75px',border:'1px solid black'}}>
			<p class="pull-right" style={{marginBottom:'0px'}}>Hello</p><br/>
			<h2 class="pull-right" style={{marginTop:'0px'}}>{props.value}</h2>
		</div>
	)
}

export default CalculatorScreen
