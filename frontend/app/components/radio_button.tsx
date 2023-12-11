import React from "react";

type RadioProps = {
  input: string;
  width?: string;
  height?: string;
  onRadioChange: (selectedOption: string) => void;
};

function Radio({ input, width, height, onRadioChange }: RadioProps) {
  const RadioStyle = {
    width: width || "100px",
    height: height || "35px",
  };

  const handleRadioChange = () => {
    onRadioChange(input); // Call the provided onRadioChange function with the selected option
  };

  return (
    <div>
      <div
        className="flex items-center border border-gray-300 text-black text-sm rounded-md py-2 px-3 focus:border-blue-500 focus:outline-none"
        style={{
          width: RadioStyle.width,
          height: RadioStyle.height,
          backgroundColor: "#FFFAF6",
          position: "relative",
        }}
      >
        <label htmlFor={input} style={{ position: "relative" }}>
          {input}
        </label>

        <input
          type="radio"
          id={input}
          name="radioOptions"
          value={input}
          style={{
            position: "absolute",
            right: "10px",
          }}
          onChange={handleRadioChange}
        />
      </div>
    </div>
  );
}

export default Radio;
