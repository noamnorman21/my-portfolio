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

export default function Contact(props: ContactProps) {
  const dispatch = useDispatch();
  const terminalState: boolean = useSelector(
    (state: RootState) => state.terminal.open
  );
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const fromNameInputRef = useRef<HTMLInputElement | null>(null);
  const submitRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalState && fromNameInputRef.current)
      fromNameInputRef.current.focus();
  }, [terminalState]);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitRef.current) {
      submitRef.current.value = "Sending...";
    }
    const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID!;
    const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID!;
    const apiKey = process.env.REACT_APP_EMAILJS_API_KEY! || "";
    console.log("Service ID:", serviceID);
    console.log("Template ID:", templateID);
    console.log("API Key:", apiKey);

    if (!serviceID || !templateID) {
      console.error("EmailJS service ID or template ID is missing.");
      return;
    }

    emailjs
      .sendForm(serviceID, templateID, props.formRef.current!, {
        publicKey: apiKey,
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
        <label htmlFor="from_name">Name:</label>
        <input
          id="from_name"
          name="from_name"
          type="text"
          ref={fromNameInputRef}
          required
        />
      </span>
      <span className={classes.field}>
        <label htmlFor="user_email">Email:</label>
        <input
          type="email"
          name="user_email"
          id="user_email"
          ref={emailInputRef}
          required
        />
      </span>
      <span className={classes.field}>
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" />
      </span>
      <span className={classes.submit}>
        <input ref={submitRef} id="submit" type="submit" value="Send" />
      </span>
    </form>
  );
}
