import { useState, useEffect } from "react";
import classes from "./ToggleTheme.module.css";

const ToggleTheme: React.FC = () => {
  const body = document.querySelector("body")!;

  const [theme, setTheme] = useState<Boolean>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "light";
  });

  useEffect(() => {
    body.dataset.theme = theme ? "light" : "dark";
    localStorage.setItem("theme", theme ? "light" : "dark");
  }, [theme]);

  const changeTheme = () => setTheme((prevTheme) => !prevTheme);

  return (
    <a
      className={classes.themeToggle}
      tabIndex={0}
      onClick={changeTheme}
      onKeyDown={changeTheme}
      role="button"
      href="/"
    >
      <div id="darkmode" role="button" tabIndex={0}>
        <div className={classes.darkmode_icon}>
          <span className={classes.ray}></span>
          <span className={classes.ray}></span>
          <span className={classes.ray}></span>
          <span className={classes.ray}></span>
          <span className={classes.ray}></span>
          <span className={classes.ray}></span>
          <span className={classes.ray}></span>
          <span className={classes.ray}></span>
        </div>
      </div>
    </a>
  );
};
export default ToggleTheme;
