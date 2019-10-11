import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Jumbotron,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { NavLink } from "react-router-dom";

class Header extends Component {
  state = {
    isNavOpen: false,
    isModalOpen: false
  };

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };
  toggleNav = () => {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  };
  handleLogin = event => {
    this.toggleModal();
    alert(
      "UserName: " +
        this.username.value +
        "Password: " +
        this.password.value +
        "Remember: " +
        this.remember.checked
    );
    event.prevetDefault();
  };
  render() {
    return (
      <React.Fragment>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="mr-auto" href="/">
              <img
                src="./assets/images/logo.png"
                height="30"
                width="41"
                alt="Restaurant Confusion"
              />
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    <span>
                      <i className="fa fa-home fa-lg">&nbsp;Home</i>
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/aboutus">
                    <span>
                      <i className="fa fa-info fa-lg">&nbsp;About Us</i>
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/menu">
                    <span>
                      <i className="fa fa-list fa-lg">&nbsp;Menu</i>
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contactus">
                    <span>
                      <i className="fa fa-address-card fa-lg">
                        &nbsp;Contact Us
                      </i>
                    </span>
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-sign-in fa-lg"></span>
                    &nbsp;&nbsp;Login
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Restaurant confusion</h1>
                <p>
                  We take inspiration from the World's best cuisines, and create
                  a unique fusion experience. Our lipsmacking creations will
                  tickle your culinary senses!
                </p>
              </div>
            </div>
          </div>
        </Jumbotron>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  innerrRef={input => (this.username = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  innerrRef={input => (this.password = input)}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="remember"
                    innerrRef={input => (this.remember = input)}
                  />
                  Remember me
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">
                Login
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Header;
