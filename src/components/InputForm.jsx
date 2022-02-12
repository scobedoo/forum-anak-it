import React from "react";
import "../styles/input-form.scss";

export const InputForm = (props) => {
  return (
    <>
      <div className="wrapper-input-form">
        <label>{props.title}</label>
        <input
          className={`input-form ${props.isSubmit ? "error" : ""}`}
          placeholder={props.placeholder}
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    </>
  );
};
