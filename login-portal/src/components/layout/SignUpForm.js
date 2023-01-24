import classes from "./SignUpForm.module.css";
import Form from "../ui/Form";
import React from "react";

function SignUpForm(props) {
  // Handles behaviour to call API when form is submitted
  //   function submitHandler(event) {
  //     // Handle data inputs here
  //   }

  /**
   * Holds the state of the input data for first and last name
   */
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       inputFieldData: {
  //         name: {
  //           first: "",
  //           last: "",
  //           error: false,
  //         },
  //       },
  //     };
  //   }

  /**
   * Changes an input (first or last name) to have no spaces, as the user types it.
   * @param {*} name - the value of the name parameter that has just changed
   * @param {*} isFirst - a Boolean denoting if the name input being changed
   * is the first name (true) or last name (false)
   */
  //   inputChange(name, isFirst) {
  //     const nameInput = name.target.value;
  //     if (isFirst) {
  //       const lastInput = this.state.inputFieldData.last.val;
  //       // Set first name to have no spaces
  //       this.setState({
  //         inputFieldData: {
  //           name: {
  //             first: nameInput.split(" ").join(""),
  //             last: lastInput,
  //             error: false,
  //           },
  //         },
  //       });
  //     } else {
  //       // Set last name to have no spaces
  //       const firstInput = this.state.inputFieldData.first.val;
  //       this.setState({
  //         inputFieldData: {
  //           name: {
  //             first: nameInput.split(" ").join(""),
  //             last: firstInput,
  //             error: false,
  //           },
  //         },
  //       });
  //     }
  //   }

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
      </form>
    </Form>
  );
}

export default SignUpForm;
