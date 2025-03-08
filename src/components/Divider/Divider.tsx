import classes from "./Divider.module.css";
import { useState, useEffect } from "react";

export default function Divider() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={classes.divider}>
      {"/*"}
      <p>{"*".repeat(width)}</p>
      {"*/"}
    </div>
  );
}
