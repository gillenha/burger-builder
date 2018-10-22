import React, { Component } from 'react';

import Auxil from '../../hoc/Auxil';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler.js';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
	lettuce: 0.5,
	tomato: 0.5,
	cheese: 0.5,
	beef: 1.5,
	bacon: 0.75
};

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 5.95,
		purchaseable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	componentDidMount () {
		axios.get('https://my-react-burger-8f058.firebaseio.com/ingredients.json')
		.then(response => {
			this.setState({ ingredients: response.data });
		} )
		.catch(error => {
			this.setState({ error: true })
		} )
	}

	updatePurchaseState (ingredients) {
		const sum = Object.keys(ingredients)
			.map(igkey => {
				return ingredients[igkey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		this.setState({ purchaseable: sum > 0 });
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
		// alert('You continue!');
		this.setState({loading: true})
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Harry Gillen',
				address: {
					street: '123 Anywhere St',
					zipCode: '12345',
					country: 'United States',
				},
				email: 'test@test.com'
			},
			deliveryMethod: 'fastest'
		}
		axios.post('/orders.json', order)
		.then(response => {
			this.setState({
				loading: false,
				purchasing: false
			})
		})
		.catch(error => {
			this.setState({
				loading: false,
				purchasing: false
			})
		});
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		let orderSummary = null;
		let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />

		if (this.state.ingredients) {
			burger = (
				<Auxil>
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

			orderSummary = <OrderSummary 
						price={this.state.totalPrice}
						ingredients={this.state.ingredients}
						purchaseCancelled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler} />;
		}

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<Auxil>
				<Modal 
					show={this.state.purchasing} 
					modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
					{burger}
			</Auxil>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);