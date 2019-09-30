import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class DishDetail extends Component {
  formatDate(date) {
    const myDate = new Date(date);
    const day = myDate.getDay();
    const year = myDate.getFullYear();
    const month = myDate.toString().split(" ")[1];
    return `${month} ${day}, ${year}`;
  }
  render() {
    const detail = this.props.dish.comments.map(detail => (
      <div key={detail.id}>
        <div>
          --{detail.author}&nbsp;,&nbsp;{this.formatDate(detail.date)}
        </div>
        <br />
        <div>{detail.comment}</div>
        <br />
      </div>
    ));

    return (
      <div className="row m-1">
        <Card className="col-md-5 m-1 ">
          <CardImg
            width="100%"
            object
            src={this.props.dish.image}
            alt={this.props.dish.name}
          />
          <CardBody>
            <CardTitle>{this.props.dish.name}</CardTitle>
            <CardText>{this.props.dish.description}</CardText>
          </CardBody>
        </Card>
        <div className="col-md-5 m-1">
          <h3>Comments</h3>
          {detail}
        </div>
      </div>
    );
  }
}

export default DishDetail;
