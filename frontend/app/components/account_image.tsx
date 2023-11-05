import React from "react";
import CircleIcon from "@mui/icons-material/Circle";

type ImageProps = {
  ImageIcon: JSX.Element;
};

function Image({ ImageIcon }: ImageProps) {
  return (
    <div>
      <button className="flex items-center text-textcolor">{ImageIcon}</button>
    </div>
  );
}

export default Image;
