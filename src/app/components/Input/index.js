import React, { useId } from "react";

function Input({ label, id, type = "text", onChange }) {
  const generatedId = useId();

  return (
    <>
      {label && <label htmlFor={id || generatedId}>{label}</label>}
      <input id={id || generatedId} type={type} onChange={onChange} />
    </>
  );
}

export default Input;
