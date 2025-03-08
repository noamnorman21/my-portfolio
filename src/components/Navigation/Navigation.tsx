import classes from "./Navigation.module.css";
// import footerClasses from "../Footer/Footer.module.css";
import { useDispatch } from "react-redux";
import { expandTerminal as expandTerminalAction } from "../../store/terminalSlice";

export default function Navigation() {
  const dispatch = useDispatch();

  return (
    <nav tabIndex={0} id="navigation">
      <ul className={classes.nav_links}>
        <li className={classes.nav_item}>
          <a href="#about">About Me</a>
        </li>

        <li className={classes.nav_item}>
          <a href="#myskills">My Skills</a>
        </li>

        <li className={classes.nav_item}>
          <a href="#portfolio">Portfolio</a>
        </li>

        <li className={classes.nav_item}>
          <button onClick={() => dispatch(expandTerminalAction())}>
            Contact
          </button>
        </li>
      </ul>
    </nav>
  );
}
