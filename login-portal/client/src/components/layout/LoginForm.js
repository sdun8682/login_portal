import classes from "./SignUpForm.module.css";
import Form from "../ui/Form";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

/**
 * A Login Form only asks for the User's email to log in, and is intended for returning
 * users. Their first name and last name will already be recorded in the backend DB.
 * @param {*} props
 * @returns a LoginForm object depending on it's [submit] state.
 */
function LoginForm(props) {
  const [email, setEmail] = useState();

  // Used to track if the user has pressed submit yet
  const [submit, setSubmit] = useState(false);

  /**
   * Sends a request to the /login endpoint that call's EZiD's /send API to generate
   * a magic link.
   * @param {*} e -> the submit event from the user submitting the form
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);

    axios
      .post(`http://localhost:5001/login`, {
        headers: {
          key: "Content-Type",
          accepts: "application/json",
        },
        data: {
          email: email,
          returning: true,
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
        <p>Login to your existing account here.</p>
        <form onSubmit={handleSubmit}>
          <div className={classes.formItem}>
            <label htmlFor="eml">Email</label>
            <input
              type="email"
              placeholder="youremail@ezid.io"
              required
              id="eml"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={classes.submitButton}>
            <button type="submit" className={classes.btn}>
              Login
            </button>
          </div>
        </form>
        <p>
          Don't have an account? <Link to="/">Sign up</Link>
        </p>
      </Form>
    );
  }
}

export default LoginForm;
