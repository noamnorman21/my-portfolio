import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, MouseEvent } from "react";
import Contact from "./Contact/Contact";
import classes from "./Footer.module.css";
import TerminalMessage from "./TerminalMessage";
import { RootState } from "../../store";
import {
  expandTerminal as expandTerminalAction,
  // dispayLeaveMessage as dispayLeaveMessageAction,
} from "../../store/terminalSlice";
import ExperienceTimeline from "./Experience/ExperienceTimeline";

export default function Footer() {
  const dispatch = useDispatch();
  const terminalState = useSelector((state: RootState) => state.terminal);

  const [activeTab, setActiveTab] = useState<
    "message" | "copyrights" | "experience"
  >("message");

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
      );
    }
  };

  const viewportHeight = window.innerHeight;
  const vh = 70;
  const px = (vh / 100) * viewportHeight;
  const [sidebarTop, setSidebarTop] = useState(px);

  const onTerminal = () => {
    if (terminalState.open) {
      setSidebarTop(px);
    }
    dispatch(expandTerminalAction());
  };

  const rsMouseDownHandler = (e: MouseEvent<HTMLElement>) => {
    if (!(e.target as HTMLElement).classList.contains(classes.resizer)) return;

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
  };

  const handleTabClick = (tab: "message" | "copyrights" | "experience") => {
    setActiveTab(tab);
  };

  return (
    <footer
      id="footer"
      ref={sidebarRef}
      style={{ top: `${sidebarTop}px` }}
      className={terminalState.open ? classes.expand : ""}
    >
      <div
        className={classes.resizer}
        style={{ cursor: "ns-resize" }}
        onMouseDown={rsMouseDownHandler}
      >
        <span className={classes.resizeAlert}>
          <i onDoubleClick={onTerminal} className="resize"></i>
        </span>
      </div>

      <div className={classes.container}>
        <div className={classes.footerContent}>
          <div className={classes.footerNav}>
            <div className={classes.tabs}>
              <button
                className={`${classes.tab} ${
                  activeTab === "message" ? classes.active : ""
                }`}
                onClick={() => handleTabClick("message")}
              >
                LEAVE A MESSAGE
              </button>
              <button
                className={`${classes.tab} ${
                  activeTab === "copyrights" ? classes.active : ""
                }`}
                onClick={() => handleTabClick("copyrights")}
              >
                COPYRIGHTS
              </button>
              <button
                className={`${classes.tab} ${
                  activeTab === "experience" ? classes.active : ""
                }`}
                onClick={() => handleTabClick("experience")}
              >
                EXPERIENCE
              </button>
              <button
                className={classes.tab}
                onClick={() => window.scrollTo(0, 0)}
              >
                TOP
              </button>
            </div>
          </div>

          {activeTab === "message" && (
            <>
              <TerminalMessage
                terminalMsgRef={terminalMsgRef}
                terminalTxt="leave a message"
                terminalPath="/contact"
              />
              <Contact
                formRef={contactForm as React.RefObject<HTMLFormElement>}
                handleHide={handleHide}
              />
            </>
          )}
          {activeTab === "copyrights" && (
            <>
              <TerminalMessage
                terminalMsgRef={terminalMsgRef}
                terminalTxt="copyrights"
                terminalPath="/"
              />
              <div>
                <p>
                  <i className="bx bx-heart bx-burst"></i> Made By Noam Norman.
                  &copy; {new Date().getFullYear()} All rights reserved.{" "}
                  <i className="bx bx-heart bx-burst"></i>
                </p>
              </div>
            </>
          )}
          {activeTab === "experience" && (
            <>
              <TerminalMessage
                terminalMsgRef={terminalMsgRef}
                terminalTxt="experience"
                terminalPath="/"
              />
              <ExperienceTimeline />
            </>
          )}
        </div>

        <div className={classes.terminalButtons}>
          <span>
            <i className="bx bash"></i>bash
          </span>
          <span>
            <i className="plus"></i>
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
