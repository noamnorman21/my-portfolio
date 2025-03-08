import { useState, useEffect } from "react";
import classes from "./ToggleTheme.module.css";

export default function ToggleTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") === "light"
  );

  useEffect(() => {
    document.body.dataset.theme = theme ? "light" : "dark";
    localStorage.setItem("theme", theme ? "light" : "dark");
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => !prev);

  return (
    <button
      className={classes.themeToggle}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <div id="darkmode" role="presentation">
        <div className={classes.darkmode_icon}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className={classes.ray}></span>
          ))}
        </div>
      </div>
    </button>
  );
}
