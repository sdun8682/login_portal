import classes from "./Layout.module.css";

function Layout(props) {
  return (
    <div>
      <main classes={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
