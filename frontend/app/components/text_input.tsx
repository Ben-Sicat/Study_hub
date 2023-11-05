import React from "react";

type InputProps = {
  placeholder: string;
  width?: string;
  height?: string;
};

function TextInput({ placeholder, width, height }: InputProps) {
  const InputStyle = {
    width: width || "18.875rem",
    height: height || "2.5rem",
  };

  return (
    <div className="flex justify-center items-center mt-5">
      <div className="relative" style={{ width: InputStyle.width }}>
        <input
          type="text"
          className="w-full h-full rounded-lg border border-textcolor text-transparent bg-transparent px-2"
          style={{ height: InputStyle.height }}
        />
        <div className="absolute top-1 left-2 text-xs text-gray-400 pointer-events-none">
          {placeholder}
        </div>
      </div>
    </div>
  );
}

export default TextInput;
