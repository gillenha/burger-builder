import React from 'react';

import Auxil from '../../../hoc/Auxil';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

	const ingredientSummary = Object.keys(props.ingredients)
		.map(igKey => {
			return (
				<li key={igKey}>
					<span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
				</li> );
		} );
	let orderPrice = props.price.toFixed(2);
	let salesTax = orderPrice * 0.08;
	let orderTotal = Number(salesTax) + Number(orderPrice);
	return (
		<Auxil>
			<h3>Your Order:</h3>
			<p>A delicious Burger with the following ingredients:</p>
			<ul>
				{ingredientSummary}
			</ul>
			<p>Order Price: &#36;{orderPrice}</p>
			<p>Sales tax: &#36;{salesTax.toFixed(2)}</p>
			<p><strong>Your total: &#36;{orderTotal.toFixed(2)}</strong></p>
			<p>Continue to Checkout?</p>
			<Button 
				btnType="Danger" 
				clicked={props.purchaseCancelled}>CANCEL</Button>
			<Button 
				btnType="Success" 
				clicked={props.purchaseContinued}>CONTINUE</Button>
		</Auxil>
	);
};

export default orderSummary;