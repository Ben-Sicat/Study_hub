import React from "react";

type IconProps = {
  ButtonIcon: JSX.Element;
};

function Upper({ ButtonIcon }: IconProps) {
  return (
    <div>
      <button className="flex items-center text-textcolor py-2 px-2 mt-8 ml-7 mb-2">
        {ButtonIcon}
      </button>
    </div>
  );
}

export default Upper;
