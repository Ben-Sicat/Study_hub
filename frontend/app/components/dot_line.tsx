import React from "react";

type DLineProps = {
  ButtonIcon: JSX.Element;
};

function DotLineZ({ ButtonIcon }: DLineProps) {
  return (
    <div>
      <div>{ButtonIcon}</div>
    </div>
  );
}

export default DotLineZ;
