import React from 'react';

const Button = ({ label, handleClick }) => {
  return (
    <button className="button" onClick={() => handleClick(label)}>
      {label}
    </button>
  );
};

export default Button;
