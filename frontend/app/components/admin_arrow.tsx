import React from "react";

type IconProps = {
  ButtonIcon: JSX.Element;
};

function Left({ ButtonIcon }: IconProps) {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          right: "1%",
          top: "50%",
          transform: "translateY(-90%)",
        }}
      >
        <button>{ButtonIcon}</button>
      </div>
    </div>
  );
}

export default Left;
