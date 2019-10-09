// import React, { Component } from "react";
// import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";

// class Menu extends Component {
//   render() {
//     const menu = this.props.dishes.map(dish => (
//       <div key={dish.id} className="col-12 col-md-5 m-1">
//         <Card
//           style={{ cursor: "pointer" }}
//           onClick={() => this.props.onClick(dish.id)}
//           tag="li"
//         >
//           <CardImg width="100%" object src={dish.image} alt={dish.name} />
//           <CardImgOverlay>
//             <CardTitle>{dish.name}</CardTitle>
//           </CardImgOverlay>
//         </Card>
//       </div>
//     ));
//     return (
//       <div className="container">
//         <div className="row">{menu}</div>
//       </div>
//     );
//   }
// }

// export default Menu;

import React from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";

function RenderMenuItem({ dish, onClick }) {
  return (
    <Card
      style={{ cursor: "pointer" }}
      onClick={() => onClick(dish.id)}
      tag="li"
    >
      <CardImg width="100%" object src={dish.image} alt={dish.name} />
      <CardImgOverlay>
        <CardTitle>{dish.name}</CardTitle>
      </CardImgOverlay>
    </Card>
  );
}
const Menu = props => {
  const menu = props.dishes.map(dish => (
    <div key={dish.id} className="col-12 col-md-5 m-1">
      <RenderMenuItem dish={dish} onClick={props.onClick} />
    </div>
  ));
  return (
    <div className="container">
      <div className="row">{menu}</div>
    </div>
  );
};

export default Menu;