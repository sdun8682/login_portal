import classes from "./SignUpForm.module.css";
import Form from "../ui/Form";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

/**
 * The Sign Up form asks for the user's first, last name and email. It is displayed
 * by default. Intended for users who have not used the portal before.
 * @param {*} props
 * @returns a SignUpForm object depending on it's [submit] state.
 */
function SignUpForm(props) {
  /**
   * Recording form inputs. Should be empty by default.
   */
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  /**
   * Records if the sign up form has been submitted or not.
   */
  const [submit, setSubmit] = useState(false);

  /**
   * Sends a request to the /login endpoint that call's EZiD's /send API to generate
   * a magic link.
   * @param {*} e -> the submit event from the user submitting the form
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    console.log("Handling...");

    axios
      .post(`http://localhost:5001/login`, {
        headers: {
          key: "Content-Type",
          accepts: "application/json",
        },
        data: {
          email: email,
          first: firstName,
          last: lastName,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Returns true if an input contains a space, false if it does not.
   * @param {*} word - the string to be checked for spaces.
   */
  function checkForSpaces(word) {
    return word.indexOf(" ") >= 0;
  }

  /**
   * Handles a change in one of the name fields - first or last and verifies if it is valid
   * according to the rule that a name field may not contain spaces.
//    * @param {*} event - the input's state after being changed.
//    */
  //   nameChangeHandler = (event) => {
  //     const { value } = event.target;
  //     const checkInvalid = this.checkForSpaces(value);
  //     this.setState({
  //       isInvalid: checkInvalid,
  //     });
  //   };

  /**
   * If the user hasn't yet submitted the form, display the form, otherwise
   * a message directing the User to their email is displayed.
   */
  if (submit) {
    return (
      <Form>
        <p>Link sent to {email}!</p>
      </Form>
    );
  } else {
    return (
      <Form>
        <p>Sign up here to register to the EZiD platform.</p>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.formItem}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              required
              id="firstName"
              placeholder="John"
              maxLength="200"
              minLength="1"
              onChange={(e) => setFirstName(e.target.value)}
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
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className={classes.formItem}>
            <label htmlFor="eml">Email</label>
            <input
              type="email"
              placeholder="youremail@ezid.io"
              required
              id="eml"
              // value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={classes.submitButton}>
            <button type="submit" className={classes.btn}>
              Sign up
            </button>
          </div>
          {/* Only renders if name text state contains spaces.
        {this.state.isInvalid && (
          <div className={classes.error} style={{ color: "#F61C04" }}>
            <p>Spaces are not allowed in a name!</p>
          </div>
        )} */}
          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </form>
      </Form>
    );
  }
}

export default SignUpForm;
