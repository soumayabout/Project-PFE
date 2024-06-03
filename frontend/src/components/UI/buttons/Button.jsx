import React from "react";

import classes from "./Button.module.css";

function Button({
  text,
  onClick,
  type = "button",
  className,
  disabled = false,
  backgroundColor,
  textColor
}) {
  const buttonStyle = {
    backgroundColor: disabled ? "#d6d6d6" : backgroundColor,
    color: textColor ? textColor : "#fff",
  };

  return (
    <button
      className={`${classes.button} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={buttonStyle}
    >
      {text}
    </button>
  );
}

export default Button;
