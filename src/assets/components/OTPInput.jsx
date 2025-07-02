// src/components/OTPInput.jsx
import React, { useRef, useState, useEffect } from "react";

const OTPInput = ({ length = 6, onComplete }) => {
  const [values, setValues] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (e, i) => {
    const val = e.target.value;
    if (!/^\d?$/.test(val)) return;

    const newValues = [...values];
    newValues[i] = val;
    setValues(newValues);

    if (val && i < length - 1) {
      inputsRef.current[i + 1].focus();
    }

    const code = newValues.join("");
    if (code.length === length && !newValues.includes("")) {
      onComplete(code);
    }
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace") {
      if (values[i] === "" && i > 0) {
        inputsRef.current[i - 1].focus();
      }
    } else if (e.key === "ArrowLeft" && i > 0) {
      inputsRef.current[i - 1].focus();
    } else if (e.key === "ArrowRight" && i < length - 1) {
      inputsRef.current[i + 1].focus();
    }
  };

  return (
    <div className="flex justify-center gap-3 mt-6">
      {values.map((value, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className=" w-14 h-16 text-center text-xl border border-gray-400 rounded-xl focus:outline-none focus:border-black"
          value={value}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
        />
      ))}
    </div>
  );
};

export default OTPInput;
