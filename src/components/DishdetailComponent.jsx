import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class DishDetail extends Component {
  formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    }).format(new Date(date));
  }
  render() {
    const detail = this.props.dish.comments.map(detail => (
      <li key={detail.id}>
        --{detail.author}&nbsp;,&nbsp;{this.formatDate(detail.date)}
        <br />
        {detail.comment}
        <br />
        <br />
      </li>
    ));

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <Card>
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
          </div>

          <div className="col-12 col-md-5 m-1">
            <h3>Comments</h3>

            <ul style={{ listStyleType: "none", padding: "0" }}>{detail}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default DishDetail;
