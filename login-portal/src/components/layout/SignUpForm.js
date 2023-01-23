import classes from "./SignUpForm.module.css";
import Form from "../ui/Form";

function SignUpForm(props) {
  // Handles behaviour to call API when form is submitted
  function submitHandler(event) {
    // Handle data inputs here
  }

  return (
    <Form>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.formItem}></div>
        <div className={classes.formItem}></div>
        <div className={classes.formItem}></div>
      </form>
    </Form>
  );
}
