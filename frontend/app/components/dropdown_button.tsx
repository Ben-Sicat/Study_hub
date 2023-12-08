import React from "react";

type DropProps = {
  width?: string;
  height?: string;
  options: string[];
  onSelect: (selectedOption: string) => void;
};

function Drop({ width, height, options, onSelect }: DropProps) {
  const DropStyle = {
    width: width || "100px",
    height: height || "35px",
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    onSelect(selectedOption);
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
          className=" border border-gray-300 text-black text-sm rounded-md py-2 px-3 focus:border-blue-500 focus:outline-none"
          onChange={handleSelectChange}
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
