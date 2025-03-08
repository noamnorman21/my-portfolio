import { useState, useEffect } from "react";
import classes from "./Footer.module.css";

interface TerminalMessageProps {
  terminalMsgRef: React.RefObject<HTMLDivElement | null>;
  terminalTxt?: string;
  terminalPath?: string;
}

export default function TerminalMessage({
  terminalMsgRef,
  terminalTxt,
  terminalPath,
}: TerminalMessageProps) {
  const time = new Date().toLocaleTimeString();
  const [visitCount, setVisitCount] = useState<number>(0);

  useEffect(() => {
    const storedCount = localStorage.getItem("visitCount");
    const currentCount = storedCount ? parseInt(storedCount, 10) : 0;
    const newCount = currentCount + 1;
    setVisitCount(newCount);
    localStorage.setItem("visitCount", newCount.toString());
  }, []);

  return (
    <div
      id="leaveMessage"
      ref={terminalMsgRef}
      className={classes.leaveMessage}
    >
      <span className={classes.currentTime}>{time}</span>
      <span className={classes.name}>[noam]</span>
      <span className={classes.message}>{terminalTxt}</span>
      <span className={classes.path}>{terminalPath}</span>
      <span className={classes.fileUpdated}>(x{visitCount})</span>
    </div>
  );
}
