import React from "react";
import { ButtonProps } from "../../models";
import "./Button.css";

const Button = (props: ButtonProps) => {
  return (
    <>
      <div
        key={props.key}
        className={`btn-outer ${props.className}`}
        onClick={props.onClick}
      >
        {props.buttonText}
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
};

export default Button;
