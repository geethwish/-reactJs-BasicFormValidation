import React, { Component } from "react";
import "./styles/App.css";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    };
  }
  handleSubmit = e => {
    var fnError;
    var lnError;
    var eError;
    var pError;
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      if (
        this.state.firstName == null &&
        this.state.lastName == null &&
        this.state.email == null &&
        this.state.password == null
      ) {
        this.setState({
          formErrors: {
            firstName: "*First Name can not be Empty.",
            lastName: "*Last Name can not be Empty.",
            email: "Email can not be Empty",
            password: "Password can not be Empty"
          }
        });
      }
      if (
        this.state.firstName == null ||
        this.state.lastName == null ||
        this.state.email == null ||
        this.state.password == null
      ) {
        if (this.state.firstName == null) {
          fnError = "Please Enter Your First Name";
        } else {
          fnError = "";
        }
        if (this.state.lastName == null) {
          lnError = "Please Enter Your Last Name";
        } else {
          lnError = "";
        }
        if (this.state.email == null) {
          eError = "Please Enter Your Emali Address";
        } else {
          eError = "";
        }
        if (this.state.password == null) {
          pError = "Please Enter Your Password";
        } else {
          pError = "";
        }
        this.setState({
          formErrors: {
            firstName: fnError,
            lastName: lnError,
            email: eError,
            password: pError
          }
        });
      }
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "*minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "*minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "*invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "*minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };
  render() {
    const { formErrors } = this.state;
    return (
      <div className="App">
        {/* <img src={logo} className="App-logo" alt="logo" />*/}
        <div className="wrapper">
          <div className="form-wrapper">
            <h1>Create Account</h1>
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="firstName">
                <label htmlFor="firstName">First Name</label>
                <input
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  noValidate
                  onChange={this.handleChange}
                  className={formErrors.firstName.length > 0 ? "error" : null}
                />
                {formErrors.firstName.length > 0 && (
                  <span className="errorMessage">{formErrors.firstName}</span>
                )}
              </div>
              <div className="lastName">
                <label htmlFor="lastName">Last Name</label>
                <input
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  noValidate
                  onChange={this.handleChange}
                  className={formErrors.lastName.length > 0 ? "error" : null}
                />
                {formErrors.lastName.length > 0 && (
                  <span className="errorMessage">{formErrors.lastName}</span>
                )}
              </div>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  noValidate
                  onChange={this.handleChange}
                  className={formErrors.email.length > 0 ? "error" : null}
                />
                {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}
              </div>
              <div className="password">
                <label htmlFor="password">Password</label>
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  noValidate
                  onChange={this.handleChange}
                  className={formErrors.password.length > 0 ? "error" : null}
                />
                {formErrors.password.length > 0 && (
                  <span className="errorMessage">{formErrors.password}</span>
                )}
              </div>
              <div className="createAccount">
                <button type="submit">Create Account</button>
                <small>Already Have an Account?</small>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
