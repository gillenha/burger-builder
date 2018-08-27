import React, { Component } from 'react';

import Auxil from '../../hoc/Auxil';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
	lettuce: 0.5,
	tomato: 0.5,
	cheese: 0.5,
	beef: 1.5,
	bacon: 0.75
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			lettuce: 0,
			tomato: 0,
			cheese: 0,
			bacon: 0,
			beef: 0
		},
		totalPrice: 5.95,
		purchaseable: false,
		purchasing: false
	}

	updatePurchaseState (ingredients) {
		const sum = Object.keys(ingredients)
			.map(igkey => {
				return ingredients[igkey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		this.setState({
			purchaseable: sum > 0
		});
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients
		});
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = ( type ) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients
		});
		this.updatePurchaseState(updatedIngredients);
	}

	purchaseHandler = () => {
		this.setState({
			purchasing: true
		});
	}

	purchaseCancelHandler = () => {
		this.setState({
			purchasing: false
		})
	}

	purchaseContinueHandler = () => {
		alert('You continue!');
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		return (
			<Auxil>
				<Modal 
					show={this.state.purchasing} 
					modalClosed={this.purchaseCancelHandler}>
					<OrderSummary 
						price={this.state.totalPrice}
						ingredients={this.state.ingredients}
						purchaseCancelled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler} />
				</Modal>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						disabled={disabledInfo}
						purchaseable={this.state.purchaseable}
						price={this.state.totalPrice}
						ordered={this.purchaseHandler} />
			</Auxil>
		);
	}
}

export default BurgerBuilder;