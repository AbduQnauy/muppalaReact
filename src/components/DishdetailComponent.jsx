import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Col,
  Row
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

// ///////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////
const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

class CommentForm extends Component {
  state = {
    isModalOpen: false
  };
  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };
  handleSubmit(values) {
    this.props.postComment(
      this.props.dishId,
      values.select,
      values.name,
      values.textarea
    );
  }
  render() {
    return (
      <React.Fragment>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span>
          &nbsp;&nbsp;Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="select" md={5}>
                  <strong>Rating</strong>
                </Label>
                <Col md={12}>
                  <Control.select
                    model=".select"
                    id="select"
                    name="select"
                    className="form-control"
                    validators={{
                      required
                    }}
                  >
                    <option value=""></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                  <Errors
                    className="text-danger"
                    model=".select"
                    show="touched"
                    messages={{
                      required: "Required "
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="name" md={5}>
                  <strong>Your Name</strong>
                </Label>
                <Col md={12}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "Required ",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be less than 16 characters"
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="name" md={5}>
                  <strong>Comment</strong>
                </Label>
                <Col md={12}>
                  <Control.textarea
                    model=".textarea"
                    id="textarea"
                    name="textarea"
                    rows="6"
                    className="form-control"
                  />
                  <Errors
                    className="text-danger"
                    model=".textarea"
                    show="touched"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={10}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

// ///////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////
function RenderDishDetail({ dish }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)"
        }}
      >
        <Card>
          <CardImg
            width="100%"
            object
            src={baseUrl + dish.image}
            alt={dish.name}
          />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    </div>
  );
}
function Comment({ detail, formatDate }) {
  return (
    <li key={detail.id}>
      --{detail.author}&nbsp;,&nbsp;{formatDate(detail.date)}
      <br />
      {detail.comment}
      <br />
      <br />
    </li>
  );
}
function Comments({ comments }) {
  const formatDate = date => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    }).format(new Date(date));
  };
  return comments.map(detail => (
    <Fade in>
      <Comment detail={detail} formatDate={formatDate} />
    </Fade>
  ));
}
function RenderComments({ comments, postComment, dishId }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <h3>Comments</h3>

      <ul style={{ listStyleType: "none", padding: "0" }}>
        <Stagger in>
          <Comments comments={comments} />
        </Stagger>
      </ul>
      <CommentForm dishId={dishId} postComment={postComment} />
    </div>
  );
}

const DishDetail = props => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.commentErrMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.commentErrMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <br />
          </div>
        </div>
        <div className="row">
          <RenderDishDetail dish={props.dish} />
          <RenderComments
            comments={props.comments}
            postComment={props.postComment}
            dishId={props.dish.id}
          />
        </div>
      </div>
    );
  } else return <div></div>;
};

export default DishDetail;
