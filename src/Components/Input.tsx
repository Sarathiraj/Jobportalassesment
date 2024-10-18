import React from "react";

interface Inputprops {
  value: string;
  onChange: React.ChangeEventHandler;
  onBlur: any;
  className: any;
  name: string;
}

const Input: React.FC<Inputprops> = ({
  value,
  onChange,
  onBlur,
  className,
  name,
}) => {
  return (
    <>
      {" "}
      <input
        name={name}
        onBlur={onBlur}
        type="text"
        value={value}
        onChange={onChange}
        className={className}
        required
      />
    </>
  );
};

export default Input;
