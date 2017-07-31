import React from 'react'
import PropTypes from 'prop-types';

const CalculatorButtonGroup = (props) => {
	return (
		<div class='panel-body' style={{paddingTop:'0px', paddingBottom:'0px'}}>
			{props.children}
		</div>
	)
}

export default CalculatorButtonGroup

CalculatorButtonGroup.propTypes = {
	children: PropTypes.node
}
