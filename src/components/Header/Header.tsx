import classes from "./Header.module.css";
import ToggleTheme from "./Theme/ToggleTheme";

export default function Header() {
  return (
    <header id="header">
      <div className={classes.logo}>
        <div className={classes.emojy}>
          <img src="/img/My-Avatar.png" alt="noam norman" />
        </div>

        <div className={classes.content}>
          <a href="/" className={classes.myname}>
            noam_norman
          </a>
          <div className={classes.mytitle}>Full Stack developer</div>
        </div>
      </div>

      <div className={classes.contactButtons}>
        <ToggleTheme />
        <a
          rel="noreferrer"
          className={classes.platformLink}
          target="_blank"
          href="mailto:normannoam21@gmail.com"
        >
          <i className={`${classes.icon} bx bx-md bx-envelope`}></i>
        </a>
        <a
          rel="noreferrer"
          className={classes.platformLink}
          target="_blank"
          href="https://www.linkedin.com/in/noam-norman"
        >
          <i className={`${classes.icon} bx bx-md bxl-linkedin-square`}></i>
        </a>
        <a
          rel="noreferrer"
          className={classes.platformLink}
          target="_blank"
          href="https://github.com/noamnorman21"
        >
          <i className={`${classes.icon} bx bx-md bxl-github`}></i>
        </a>
      </div>
    </header>
  );
}
