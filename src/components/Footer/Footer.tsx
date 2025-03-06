import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, MouseEvent } from "react";
import Contact from "./Contact/Contact";
import classes from "./Footer.module.css";
import TerminalMessage from "./TerminalMessage";
import { RootState } from "../../store";
import {
  expandTerminal as expandTerminalAction,
  dispayLeaveMessage as dispayLeaveMessageAction,
} from "../../store/terminalSlice";

export default function Footer() {
  const dispatch = useDispatch();
  const terminalState = useSelector((state: RootState) => state.terminal);

  const [contactFormVisible, setContactFormVisible] = useState<boolean>(true);

  const terminalMsgRef = useRef<HTMLDivElement | null>(null);
  const contactForm = useRef<HTMLFormElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleHide = (
    ref: React.RefObject<HTMLFormElement | HTMLDivElement>
  ) => {
    if (ref.current) {
      ref.current.classList.add(classes["slide-up-hidden"]);

      ref.current.addEventListener(
        "transitionend",
        () => {
          ref.current!.style.display = "none";
        },
        { once: true }
      ); // Ensures the listener is removed after it's called
    }
  };

  const viewportHeight = window.innerHeight;
  const vh = 80;
  const px = (vh / 100) * viewportHeight;
  const [sidebarTop, setSidebarTop] = useState(px);

  const onTerminal = () => {
    if (terminalState.open) {
      setSidebarTop(px);
    }
    dispatch(expandTerminalAction());
  };

  const rsMouseDownHandler = (e: MouseEvent<HTMLElement>) => {
    if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
      dispatch(dispayLeaveMessageAction(false));
      if (!terminalState.open) {
        dispatch(expandTerminalAction());
      }
    } else {
      e.preventDefault();
      const y = e.clientY;
      const sbTop = window.getComputedStyle(sidebarRef.current!).top;
      const initialTop = parseInt(sbTop, 10);

      const mouseMoveHandler = (e: { clientY: number }) => {
        const dy = e.clientY - y;
        const newTop = initialTop + dy;

        if (newTop >= 10 && newTop <= viewportHeight - 10) {
          setSidebarTop(newTop);
        }
      };

      const mouseUpHandler = () => {
        document.removeEventListener("mouseup", mouseUpHandler);
        document.removeEventListener("mousemove", mouseMoveHandler);
      };

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    }
  };

  return (
    <footer
      id="footer"
      ref={sidebarRef}
      onMouseDown={rsMouseDownHandler}
      style={{ top: `${sidebarTop}px` }}
      className={terminalState.open ? classes.expand : ""}
    >
      <div className={classes.resizer} style={{ cursor: "ns-resize" }}>
        <span className={classes.resizeAlert}>
          <i className="resize"></i>
        </span>
      </div>

      <div className={classes.container}>
        <div className={classes.footerContent}>
          <div className={classes.footerNav}>
            <div className={classes.tabs}>
              <a
                role="button"
                href="/"
                className={`${classes.tab} ${classes.active}`}
              >
                LEAVE A MESSAGE
              </a>
              <a role="button" href="/" className={classes.tab}>
                COPYRIGHTS
              </a>
              <a role="button" href="/" className={classes.tab}>
                PLATFORMS
              </a>
              <a role="button" href="#header" className={classes.tab}>
                TOP
              </a>
            </div>
          </div>

          <div
            className={`${classes["slide-up"]} ${
              !terminalState.leaveMessage
                ? classes["slide-up-hidden"]
                : classes["slide-down"]
            }`}
          >
            <TerminalMessage terminalMsgRef={terminalMsgRef} />
          </div>

          <div
            className={`${classes.form} ${classes["slide-up"]} ${
              !contactFormVisible ? classes["slide-up-hidden"] : ""
            }`}
          >
            <Contact
              formRef={contactForm as React.RefObject<HTMLFormElement>}
              handleHide={handleHide}
              setVisible={setContactFormVisible}
            />
          </div>
        </div>

        <div className={classes.terminalButtons}>
          <span>
            <i className="bx bash"></i>bash
          </span>
          <span>
            <i className="plus"></i>
            <i className="arrow-down"></i>
          </span>
          <span>
            <i className="trash"></i>
          </span>
          <span onClick={onTerminal}>
            <i
              className={terminalState.open ? "arrow-down" : "arrow-up"}
              id="expandTerminal"
            ></i>
          </span>
          <span
            onClick={() => {
              document.getElementById("footer")!.style.display = "none";
            }}
          >
            <i className="close"></i>
          </span>
        </div>
      </div>
    </footer>
  );
}
