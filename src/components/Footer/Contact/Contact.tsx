import React, { useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import classes from "./Contact.module.css";
import { useDispatch, useSelector } from "react-redux";
import { dispayLeaveMessage } from "../../../store/terminalSlice";
import { RootState } from "../../../store";

// Define the props type for the Contact component
interface ContactProps {
  formRef: React.RefObject<HTMLFormElement>;
  handleHide: (ref: React.RefObject<HTMLFormElement | HTMLDivElement>) => void;
  setVisible: (newState: boolean) => void;
}

const Contact: React.FC<ContactProps> = (props) => {
  const dispatch = useDispatch();
  const terminalState: boolean = useSelector(
    (state: RootState) => state.terminal.open
  );
  const emailInputRef = useRef<HTMLInputElement | null>(null); // Fixed here

  useEffect(() => {
    if (terminalState && emailInputRef.current) emailInputRef.current.focus();
  }, [terminalState]);

  const submitRef = useRef<HTMLInputElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitRef.current) {
      submitRef.current.value = "Sending...";
    }

    emailjs
      .sendForm("noam.website", "noam.website", props.formRef.current!, {
        publicKey: "B2ReO4YLnvHV3iZUt",
      })
      .then(
        async () => {
          (e.target as HTMLFormElement).reset();
          if (submitRef.current) {
            submitRef.current.value = "The message was sent.";
            submitRef.current.disabled = true;
            props.setVisible(false);
            await props.handleHide(props.formRef);
            setTimeout(() => dispatch(dispayLeaveMessage(true)), 1000);
          }
        },
        (error) => {
          console.log("FAILED...", error.text);
          if (submitRef.current) {
            submitRef.current.value = "Error. Try again.";
          }
        }
      );
  };

  return (
    <form
      className={classes.contactForm}
      ref={props.formRef}
      onSubmit={sendEmail}
    >
      <span className={classes.field}>
        <label>Email:</label>
        <input type="email" name="user_email" ref={emailInputRef} required />
      </span>
      <span className={classes.field}>
        <label>Message:</label>
        <textarea name="message" />
      </span>
      <span className={classes.submit}>
        <input
          ref={submitRef}
          id="submit"
          type="submit"
          value="Send"
          required
        />
      </span>
    </form>
  );
};

export default Contact;
