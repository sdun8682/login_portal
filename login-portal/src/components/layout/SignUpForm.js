import classes from "./SignUpForm.module.css";
import Form from "../ui/Form";

function SignUpForm(props) {
  // Handles behaviour to call API when form is submitted
  //   function submitHandler(event) {
  //     // Handle data inputs here
  //   }

  return (
    <Form>
      <p>Sign up here to register to the EZiD platform.</p>
      <form className={classes.form}>
        <div className={classes.formItem}>
          <label htmlFor="firstName">First Name</label>
          <input type="text" required id="firstName" placeholder="John" />
        </div>
        <div className={classes.formItem}>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" required id="lastName" placeholder="Appleseed" />
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
