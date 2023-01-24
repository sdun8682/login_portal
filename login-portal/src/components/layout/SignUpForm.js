import classes from "./SignUpForm.module.css";
import Form from "../ui/Form";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignUpForm extends Component {
  // Handles behaviour to call API when form is submitted
  //   function submitHandler(event) {
  //     // Handle data inputs here
  //   }

  /**
   * State holds a boolean indicating whether the name fields are valid or not.
   */
  state = {
    inputFieldData: {
      name: {
        isInvalid: true,
      },
    },
  };

  /**
   * Returns true if an input contains a space, false if it does not.
   * @param {*} word - the string to be checked for spaces.
   */
  checkForSpaces = (word) => {
    return word.indexOf(" ") >= 0;
  };

  /**
   * Handles a change in one of the name fields - first or last and verifies if it is valid
   * according to the rule that a name field may not contain spaces.
   * @param {*} event - the input's state after being changed.
   */
  nameChangeHandler = (event) => {
    const { value } = event.target;
    const checkInvalid = this.checkForSpaces(value);
    this.setState({
      isInvalid: checkInvalid,
    });
  };

  /**
   * Renders the form.
   * @returns the form for a user to sign up.
   */
  render() {
    return (
      <Form>
        <p>Sign up here to register to the EZiD platform.</p>
        <form className={classes.form}>
          <div className={classes.formItem}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              required
              id="firstName"
              placeholder="John"
              maxLength="200"
              minLength="1"
              onChange={this.nameChangeHandler}
            />
          </div>
          <div className={classes.formItem}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              required
              id="lastName"
              placeholder="Appleseed"
              maxLength="200"
              minLength="1"
              onChange={this.nameChangeHandler}
            />
          </div>
          <div className={classes.formItem}>
            <label htmlFor="eml">Email</label>
            <input
              type="email"
              placeholder="youremail@ezid.io"
              required
              id="eml"
            />
          </div>
          <div className={classes.submitButton}>
            <button type="submit" className={classes.btn}>
              Sign up
            </button>
          </div>
          {/* Only renders if name text state contains spaces. */}
          {this.state.isInvalid && (
            <div className={classes.error} style={{ color: "#F61C04" }}>
              <p>Spaces are not allowed in a name!</p>
            </div>
          )}
          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </form>
      </Form>
    );
  }
}

export default SignUpForm;
