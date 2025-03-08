import React, { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import classes from "./Contact.module.css";
import { useDispatch, useSelector } from "react-redux";
import { dispayLeaveMessage } from "../../../store/terminalSlice";
import { RootState } from "../../../store";

interface ContactProps {
  formRef: React.RefObject<HTMLFormElement>;
  handleHide: (ref: React.RefObject<HTMLFormElement | HTMLDivElement>) => void;
  // setVisible: (newState: boolean) => void;
}

export default function Contact(props: ContactProps) {
  const dispatch = useDispatch();
  const terminalState: boolean = useSelector(
    (state: RootState) => state.terminal.open
  );
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const fromNameInputRef = useRef<HTMLInputElement | null>(null);
  const submitRef = useRef<HTMLInputElement>(null);
  const submitTextRef = useRef<HTMLSpanElement>(null); // Reference for the submit success text
  const [isFormValid, setIsFormValid] = useState(false);
  const [submitState, setSubmitState] = useState<
    "sending" | "success" | "error" | null
  >(null);

  useEffect(() => {
    if (terminalState && fromNameInputRef.current) {
      fromNameInputRef.current.focus();
    }
  }, [terminalState]);

  const handleInputChange = () => {
    const nameValid = fromNameInputRef.current?.value.trim() !== "";
    const emailValid = emailInputRef.current?.value.trim() !== "";
    setIsFormValid(nameValid && emailValid);
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitState("sending"); // Set the state to sending

    if (submitRef.current) {
      submitRef.current.value = "Sending...";
    }

    const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID!;
    const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID!;
    const apiKey = process.env.REACT_APP_EMAILJS_API_KEY!;

    try {
      await emailjs.sendForm(serviceID, templateID, props.formRef.current!, {
        publicKey: apiKey,
      });

      if (submitRef.current) {
        submitRef.current.value = "The message was sent.";
        submitRef.current.disabled = true;
      }

      setSubmitState("success"); // Set the state to success

      // Reset form and handle post-submission actions
      (e.target as HTMLFormElement).reset();
      await props.handleHide(props.formRef);
      setTimeout(() => dispatch(dispayLeaveMessage(true)), 1000);
    } catch (error) {
      console.error("FAILED...", error);
      if (submitRef.current) {
        submitRef.current.value = "Error. Try again.";
        submitRef.current.disabled = false;
      }

      setSubmitState("error"); // Set the state to error
    }
  };

  return (
    <>
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
        </span>
        <span className={classes.field}>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" />
        </span>
        <span className={classes.submit}>
          <input
            ref={submitRef}
            id="submit"
            type="submit"
            value="Send"
            disabled={!isFormValid}
          />
        </span>
      </form>
      <span
        id="after-submit-txt"
        ref={submitTextRef}
        className={`${classes.submitTxt} ${
          submitState === "success" ? classes.success : ""
        } ${submitState === "error" ? classes.error : ""}`}
        style={{
          display: submitState ? "block" : "none",
          opacity: submitState ? 1 : 0,
        }}
      >
        {submitState === "sending" && "Sending your message..."}
        {submitState === "success" && "Thanks for leaving a message!"}
        {submitState === "error" &&
          "Oops! Something went wrong. Please try again."}
      </span>
    </>
  );
}
