import React from "react";

type RadioProps = {
  input: string;
  width?: string;
  height?: string;
};

function Radio({ input, width, height }: RadioProps) {
  const RadioStyle = {
    width: width || "100px",
    height: height || "35px",
  };

  return (
    <div>
      <div
        className="flex items-center border border-gray-700 text-black text-sm rounded-md py-2 px-3 focus:border-blue-500 focus:outline-none"
        style={{
          width: RadioStyle.width,
          height: RadioStyle.height,
          backgroundColor: "#FFFAF6",
          position: "relative",
        }}
      >
        <label htmlFor="start" style={{ position: "relative" }}>
          {input}
        </label>

        <input
          type="radio"
          id="start"
          name="position"
          value="start"
          style={{
            position: "absolute",
            right: "10px",
          }}
        />
      </div>
    </div>
  );
}

export default Radio;
