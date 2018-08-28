import React, { Component } from 'react';

import Auxil from '../../../hoc/Auxil';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	// this could be a functional component,
	// doesn't have to be a class
	componentWillUpdate() {
		console.log('[OrderSummary] will update')
	}
	
	render() {
		const ingredientSummary = Object.keys(this.props.ingredients)
		.map(igKey => {
			return (
				<li key={igKey}>
					<span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
				</li> );
		} );

		let orderPrice = this.props.price.toFixed(2);
		let salesTax = orderPrice * 0.06;
		let orderTotal = Number(salesTax) + Number(orderPrice);
			return (
			<Auxil>
				<h3>Your Order:</h3>
				<p>A delicious Burger with the following ingredients:</p>
				<ul>
					{ingredientSummary}
				</ul>
				<p>Order Price: &#36;{orderPrice} 
				<br />
				Sales tax: &#36;{salesTax.toFixed(2)}</p>
				<p><strong>Your total: &#36;{orderTotal.toFixed(2)}</strong></p>
				<p>Continue to Checkout?</p>
				<Button 
					btnType="Danger" 
					clicked={this.props.purchaseCancelled}>CANCEL</Button>
				<Button 
					btnType="Success" 
					clicked={this.props.purchaseContinued}>CONTINUE</Button>
			</Auxil>
		);
	}
};

export default OrderSummary;