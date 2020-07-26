import React, { Component } from "react";
import CustomersService from "../data/CustomersService";

const customersService = new CustomersService();

class CustomerCreateUpdate extends Component {

  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    description: ''
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    if (params && params.pk) {
      customersService.getCustomer(params.pk).then((c) => {
        this.refs.firstName.value = c.first_name;
        this.refs.lastName.value = c.last_name;
        this.refs.email.value = c.email;
        this.refs.phone.value = c.phone;
        this.refs.address.value = c.address;
        this.refs.description.value = c.description;
      });
    }
  }

  handleChange(fieldName) {
    return (ev) => {
      ev.preventDefault()
      this.setState({
        [fieldName]: ev.target.value
      })
    }
  }

  handleCreate() {
    customersService
      .createCustomer({
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
        address: this.state.address,
        description: this.state.description,
      })
      .then((result) => {
        alert("Customer created!");
      })
      .catch(() => {
        alert("There was an error! Please re-check your form.");
      });
  }

  handleUpdate(pk) {
    customersService
      .updateCustomer({
        pk: pk,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
        address: this.state.address,
        description: this.state.description
      })
      .then((result) => {
        alert("Customer updated!");
      })
      .catch(() => {
        alert("There was an error! Please re-check your form.");
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      match: { params },
    } = this.props;

    if (params && params.pk) {
      this.handleUpdate(params.pk);
    } else {
      this.handleCreate();
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label> First Name: </label>{" "}
          <input className="form-control" type="text" onChange={this.handleChange("firstName")} />
          <label> Last Name: </label>{" "}
          <input className="form-control" type="text" onChange={this.handleChange("lastName")} />
          <label> Phone: </label>{" "}
          <input className="form-control" type="text" onChange={this.handleChange("phone")} />
          <label> Email: </label>{" "}
          <input className="form-control" type="text" onChange={this.handleChange("email")} />
          <label> Address: </label>{" "}
          <input className="form-control" type="text" onChange={this.handleChange("address")} />
          <label> Description: </label>{" "}
          <textarea className="form-control" onChange={this.handleChange("description")}>
            {" "}
          </textarea>
          <input className="btn btn-primary" type="submit" value="Submit" />
        </div>{" "}
      </form>
    );
  }
}
export default CustomerCreateUpdate;
