import React from "react";
import Upper from "./upperleft_icon";

//testing sample note

type TesteProps = {
  backButtonIcon: JSX.Element;
  title: string;
  subTitle1: string;
  onBackButtonClick?: () => void;
};

function Teste({
  title,
  subTitle1,
  backButtonIcon,
  onBackButtonClick,
}: TesteProps) {
  return (
    <div>
      {onBackButtonClick && (
        <button
          className="flex items-center text-textcolor py-2 px-2 mt-8 ml-7 mb-2 stroke-stone-700 "
          onClick={onBackButtonClick}
        >
          {backButtonIcon}
        </button>
      )}

      <h2 className=" text-textcolor text-xl font-extrabold py-2 px-2 ml-7">
        {title}
      </h2>

      <p className=" text-textcolor font-normal text-xs ml-8 mr-8 py-1 px-1">
        {subTitle1}
      </p>
    </div>
  );
}

export default Teste;
