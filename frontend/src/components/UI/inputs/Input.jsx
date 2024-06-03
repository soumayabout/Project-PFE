import React, { forwardRef } from "react";
import classes from "./Input.module.css"
const Input = forwardRef(function Input({ label, type, textarea, ...props }, ref) {
  return (
    <div className={classes.container}>
      <label className={classes.label}>
        {label}
      </label>
      {textarea ? (
        <textarea ref={ref} className={classes.input} {...props} placeholder={label}/>
      ) : (
        <input ref={ref} className={classes.input} type={type} placeholder={label} {...props} />
      )}
    </div>
  );
});

export default Input;
