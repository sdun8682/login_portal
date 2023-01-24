import "./App.css";
import SignUpForm from "./components/layout/SignUpForm";

function App() {
  return (
    <section>
      <h1> EZiD Portal 🔑</h1>
      {/* <img
        className={classes.logo}
        src="https://uploads-ssl.webflow.com/623a1fd881c44292399f3171/63c1595bc77fbce0341e4bff_logo.png"
        alt="logo"
      ></img> */}
      <SignUpForm />
    </section>
  );
}

export default App;
