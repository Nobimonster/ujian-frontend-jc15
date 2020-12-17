import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { NavigationBar } from "./component";
import { LandingPage, LoginPage, CartPage, HistoryPage } from "./pages";
import { keepLogin, fetchCartAction } from "./redux/actions";

class App extends Component {
	state = {};
	componentDidMount() {
		const id = localStorage.getItem("id");
		if (id) {
			// const { getCartByIdAction, fetchProductsAction } = this.props;
			this.props.keepLogin(id);
			this.props.fetchCartAction(id);

			// getCartByIdAction(id);
			// fetchProductsAction();
		}
	}

	render() {
		return (
			<div>
				<NavigationBar />
				<Route path="/" exact component={LandingPage} />
				<Route path="/login" component={LoginPage} />
				<Route path="/cart" component={CartPage} />
				<Route path="/history" component={HistoryPage} />
			</div>
		);
	}
}
const mapStatetoProps = (state) => {
	return {
		userID: state.user.id,
	};
};

export default connect(mapStatetoProps, { keepLogin, fetchCartAction })(App);
