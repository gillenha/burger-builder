import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{ label: 'Lettuce', type: 'lettuce' },
	{ label: 'Tomato', type: 'tomato' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Beef', type: 'beef' }
];

const buildControls = (props) => (
	<div className={classes.BuildControls}>
	<p>Current Price: <strong>&#36;{props.price.toFixed(2)}</strong></p>
		{controls.map(ctrl => (
			<BuildControl 
				key={ctrl.label} 
				label={ctrl.label}
				type={ctrl.type}
				added={() => props.ingredientAdded(ctrl.type)}
				removed={() => props.ingredientRemoved(ctrl.type)}
				disabled={props.disabled[ctrl.type]} />
		))}
		<button 
			onClick={props.ordered}
			className={classes.OrderButton}
			disabled={!props.purchaseable}>ORDER NOW</button>
	</div>
);

export default buildControls;