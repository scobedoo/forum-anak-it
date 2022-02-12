import React from "react";
import "../styles/text-comment.scss";

const TextComment = (props) => {
  return (
    <textarea
      className={`text-area ${props.isSubmit ? "error" : ""}`}
      name={props.name}
      rows={props.rows}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    ></textarea>
  );
};

export default TextComment;
