import React from "react";

const Input = ({ label, id , ...props}) => {
  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id}  {...props} required name={id}/>
    </p>
  );
};

export default Input;
