import React, { Component } from "react";
import Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";
import { DISHES } from "../shared/dishes";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";

class Main extends Component {
  state = {
    dishes: DISHES,
    selectedDish: null
  };

  onDishSelect(dishId) {
    this.setState({
      selectedDish: dishId
    });
  }
  render() {
    return (
      <div className="container">
        <Header />
        <Menu
          dishes={this.state.dishes}
          onClick={dishId => this.onDishSelect(dishId)}
        />

        <DishDetail
          dish={
            this.state.dishes.filter(
              dish => dish.id === this.state.selectedDish
            )[0]
          }
        ></DishDetail>
        <Footer />
      </div>
    );
  }
}

export default Main;
