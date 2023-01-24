import classes from "./SignUpForm.module.css";
import Form from "../ui/Form";
import { Link } from "react-router-dom";

function LoginForm(props) {
  return (
    <Form>
      <p>Login to your existing account here.</p>
      <form>
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

export default LoginForm;
