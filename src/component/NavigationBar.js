import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText,
} from "reactstrap"
import { logoutAction } from "../redux/actions"
import "./navbar.css"

class NavBar extends Component {
	state = { isOpen: false }

	toggle = () => {
		this.setState({ isOpen: !this.state.isOpen })
	}
	tombolLogout = () => {
		const { logoutAction } = this.props
		logoutAction()
		localStorage.removeItem("id")
	}

	renderNavbar = () => {
		const { userID } = this.props
		if (userID !== 0) {
			return (
				<DropdownMenu right style={{ backgroundColor: "#f3eac2", color: "white" }}>
					<Link to="/cart" className="notification" style={{ backgroundColor: "#f3eac2", color: "black" }}>
						<DropdownItem >Cart </DropdownItem>
						<span className="badge">{this.props.cart.length}</span>
					</Link>
					<Link to="/history">
						<DropdownItem>History transaction</DropdownItem>
					</Link>
					<DropdownItem divider />
					<Link to="/">
						<DropdownItem onClick={this.tombolLogout}>Logout</DropdownItem>
					</Link>
				</DropdownMenu>
			)
		}
		else {
			return (
				<DropdownMenu right>
					<Link to="/login">
						<DropdownItem>Login</DropdownItem>
					</Link>
				</DropdownMenu>
			)
		}
	}

	//TAMPILAN NAVBAR
	render() {
		const { userEmail } = this.props
		return (
			<div>
				<Navbar style={{ backgroundColor: "#db6400", color: "white" }}
					dark expand="md">

					<NavbarBrand href="/">HoopsPoint</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="mr-auto" navbar>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									Options
								</DropdownToggle>
								{this.renderNavbar()}
							</UncontrolledDropdown>
						</Nav>
						<NavbarText>{userEmail !== "" ? userEmail : ""}</NavbarText>
					</Collapse>
				</Navbar>
			</div>
		)
	}
}

//BIAR STATE NYA GLOBAL
const mapStatetoProps = (state) => {
	return {
		userID: state.user.id,
		userEmail: state.user.email,
		cart: state.cart.cart,
	}
}

export default connect(mapStatetoProps, { logoutAction })(NavBar)
