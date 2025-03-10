import React from "react";
import classes from "./About.module.css";

export default function About() {
  return (
    <>
      <p className={classes.slashes}>{"//"}</p>
      <section tabIndex={0} id="about" className={classes.about_section}>
        <div className={classes.content}>
          <span
            className={classes.type}
            style={{ "--n": "1500" } as React.CSSProperties} // fallback to 1500
          >
            Hello there, welcome to my corner of the internet! I’m Noam, a BA
            and Information Systems graduate with a GPA of 94.6{". "}
            <br />
            By day, I build web apps at the Israeli Ministry of Defense and
            teach client-side development at Ruppin{". "}
            <br />
            I'm a Full-Stack Developer with a passion for trips, music, and
            gadgets{". "}
            <br />
            Outside of coding, I enjoy solving complex problems, learning new
            tech, and exploring new places.
            <br />
            Feel free to check out my{" "}
            <a
              rel="noreferrer"
              href="https://github.com/noamnorman21"
              target="_blank"
            >
              GitHub
            </a>
            , connect with me on{" "}
            <a
              rel="noreferrer"
              href="https://linkedin.com/in/noam-norman"
              target="_blank"
            >
              LinkedIn
            </a>
            , or reach out via email at{" "}
            <a href="mailto:normannoam21@gmail.com">normannoam21@gmail.com</a>
            {". "}
            <br />
            Always open to new opportunities and collaborations!
          </span>
        </div>
      </section>
    </>
  );
}
