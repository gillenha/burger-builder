import React, { Component } from 'react';

import Auxil from '../../hoc/Auxil';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			lettuce: 1,
			cheese: 1,
			bacon: 2,
			beef: 1
		}
	}

	render() {
		return (
			<Auxil>
				<Burger ingredients={this.state.ingredients} />
				<div>Build Controls</div>
			</Auxil>
		);
	}
}

export default BurgerBuilder;