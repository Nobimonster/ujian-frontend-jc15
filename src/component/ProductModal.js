import React, { Component } from "react"
import { connect } from "react-redux"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { addToCartAction } from "../redux/actions"
import { Toast, ToastBody, ToastHeader } from "reactstrap"

class ProductModal extends Component {
	state = { isOpen: false, qty: 1, data: [], check: false }

	toggle = () => {
		const { emailUser } = this.props
		if (emailUser !== "") {
			this.setState({ isOpen: !this.state.isOpen })
		}
		else {
			alert("You must login first")
		}
	}

	//POP UP TOAST
	toastPU = () => {
		return (
			<div className="p-3 my-2 rounded">
				<Toast>
					<ToastHeader>PRODUCT ADDED!</ToastHeader>
				</Toast>
			</div>
		)
	}

	successButton = () => {
		this.setState({ isOpen: !this.state.isOpen, check: false })
	}

	//SUCCESS
	cartSuccess = () => {
		return (
			<div>
				<Button color="secondary" onClick={this.successButton}>
					Close
				</Button>
			</div>
		)
	}

	//FAILED
	cartFailed = () => {
		const { products, id } = this.props
		let res = products.find((val) => {
			return id === val.id
		})

		return (
			<div>
				<Button
					color="primary"
					onClick={this.addToCartBtn}
					disabled={res.stock === 0}>
					Add to Cart
				</Button>
				<Button color="secondary" onClick={this.toggle}>
					Cancel
				</Button>
			</div>
		)
	}

	//ADD TO CART
	addToCartBtn = () => {
		const { addToCartAction, products, id, userID, cart } = this.props
		let res = products.find((val) => {
			return val.id === id;
		})
		let data = {
			name: res.name,
			categoryID: res.categoryID,
			image: res.image,
			qty: this.state.qty,
			userID: userID,
			price: res.price,
		}
		let result = cart.find((val) => {
			return val.name === res.name
		})
		if (result) {
			let tot = result.qty + this.state.qty
			if (tot <= res.stock) {
				addToCartAction(data)
				this.setState({
					check: true,
				})
			}
			else {
				alert("Out of stock")
			}
		}
		else {
			addToCartAction(data);
			this.setState({
				check: true,
			})
		}
	}

	//increase qty
	increase = () => {
		this.setState({ qty: this.state.qty + 1 })
	}

	//decrease qty
	decrease = () => {
		this.setState({ qty: this.state.qty - 1 })
	}

	renderProducts = () => {
		const { qty } = this.state
		const { products, id } = this.props
		let res = products.find((val) => {
			return val.id === id
		})

		return (
			<div>
				<img src={res.image} alt="img not found" height="70px" />
				<div>name:{res.name}</div>
				<div>price:{res.price}</div>
				<div>stock:{res.stock}</div>
				<div>
					<Button onClick={this.decrease} disabled={this.state.qty === 1}>
						-
					</Button>
					<span className="mx-2">{qty}</span>
					<Button
						onClick={this.increase}
						disabled={this.state.qty === res.stock}
					>
						+
					</Button>
				</div>
			</div>
		)
	}

	//TAMPILAN MODAL
	render() {
		return (
			<div>
				<Button color="danger" onClick={this.toggle}>
					Add to Cart
				</Button>
				<Modal isOpen={this.state.isOpen} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
					<ModalBody>
						{this.state.check ? this.toastPU() : this.renderProducts()}
					</ModalBody>
					<ModalFooter>
						{this.state.check
							? this.cartSuccess()
							: this.cartFailed()}
					</ModalFooter>
				</Modal>
			</div>
		)
	}
}

//BIAR STATE JADI GLOBAL
const mapStatetoProps = (state) => {
	return {
		products: state.product.productList,
		emailUser: state.user.email,
		userID: state.user.id,
		cart: state.cart.cart,
	}
}

export default connect(mapStatetoProps, { addToCartAction })(ProductModal)
