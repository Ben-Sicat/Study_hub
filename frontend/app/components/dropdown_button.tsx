import React from "react";

type DropProps = {
  width?: string;
  height?: string;
  options: string[];
};

function Drop({ width, height, options }: DropProps) {
  const DropStyle = {
    width: width || "100px",
    height: height || "35px",
  };

  return (
    <div>
      <div>
        <select
          id=""
          name=""
          style={{
            width: DropStyle.width,
            height: DropStyle.height,
            backgroundColor: "#FFFAF6",
          }}
          className=" border border-gray-700 text-black text-sm rounded-md py-2 px-3 focus:border-blue-500 focus:outline-none"
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Drop;
