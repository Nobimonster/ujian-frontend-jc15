import React, { Component } from "react"
import { connect } from "react-redux"
import { Button, Table } from "reactstrap"
import {
	fetchCartAction,
	deleteCartAction,
	addQtyAction,
	subQtyAction,
	checkoutAction,
} from "../redux/actions"
import Swal from "sweetalert2"

class CartPage extends Component {
	state = {}
	componentDidMount() {
		const { userID, fetchCartAction } = this.props
		fetchCartAction(userID)
	}
	deleteBtn = (id, userID) => {
		const { deleteCartAction } = this.props
		deleteCartAction(id, userID)
	}
	addBtn = (name, qty, id) => {
		const { addQtyAction, userID } = this.props
		addQtyAction(name, qty, id, userID)
	}
	subBtn = (name, qty, id) => {
		const { subQtyAction, userID } = this.props
		subQtyAction(name, qty, id, userID)
	}
	renderCart = () => {
		const { cart } = this.props
		return cart.map((val) => {
			return (
				<tr>
					<td>{val.categoryID}</td>
					<td>{val.name}</td>
					<td>
						<img src={val.image} alt="Error" height="50px" />
					</td>
					<td>
						<Button onClick={() => this.subBtn(val.name, val.qty, val.id)}>
							-
						</Button>
					</td>
					<td>{val.qty}</td>
					<td>
						<Button onClick={() => this.addBtn(val.name, val.qty, val.id)}>
							+
						</Button>
					</td>
					<td>{val.qty * val.price}</td>
					<td>
						<Button outline color="danger" onClick={() => this.deleteBtn(val.id, val.userID)}>
							Delete
						</Button>
					</td>
				</tr>
			)
		})
	}

	//TOTAL PAYMENT
	totalTransaction = () => {
		const { cart } = this.props
		let total = 0
		cart.forEach((val) => {
			total += val.qty * val.price
		})
		return total
	}

	//CHECKOUT
	checkOut = () => {
		const { cart, userID, checkoutAction } = this.props
		let date = new Date()
		let day = date.getDate()
		let month = date.getMonth()
		let year = date.getFullYear()
		const data = {
			date: `${day}-${month}-${year}`,
			total: this.totalTransaction(),
			items: cart,
			userID: userID,
		}
		checkoutAction(data)
	}

	//ALERT CHECKOUT
	checkOutAlert = () => {
		Swal.fire({
			title: "Are you sure want to checkout?",
			icon: "question",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, please!",
		})
			.then((result) => {
				if (result.isConfirmed) {
					Swal.fire("Success!", "Thanks for shopping!", "success")
					this.checkOut()
				}
			})
	}

	//TAMPILAN CART
	render() {
		const { cart } = this.props
		if (cart.length === 0) {
			return (
				<div>
					<center> <h1>No Cart Added</h1> </center>
				</div>
			)
		}
		return (
			<div>
				<Table style={{ textAlign: "center" }}>
					<thead>
						<tr>
							<th>Category ID</th>
							<th>Name</th>
							<th>Product</th>
							<th colspan="3">qty</th>
							<th>Price</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>{this.renderCart()}</tbody>
					<tfoot>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td> <h3>Total payment:</h3> </td>
							<td> Rp. {this.totalTransaction().toLocaleString()}</td>
							<td>
								<Button outline color="success" onClick={this.checkOutAlert}>Checkout </Button>
							</td>
						</tr>
					</tfoot>
				</Table>
			</div>
		)
	}
}

//biar state jadi global
const mapStatetoProps = (state) => {
	return {
		cart: state.cart.cart,
		userID: state.user.id,
	}
}

export default connect(mapStatetoProps, {
	fetchCartAction,
	deleteCartAction,
	addQtyAction,
	subQtyAction,
	checkoutAction,
})(CartPage)
