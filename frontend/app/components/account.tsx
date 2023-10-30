import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

//testing sample note

type TesteProps = {
  title: string;
  subTitle1: string;
};

function Teste({ title, subTitle1 }: TesteProps) {
  return (
    <div>
      <div>
        <button className="flex items-center text-stone-700 py-2 px-2 mt-8 ml-7 mb-2 stroke-stone-700 ">
          <ArrowBackIosIcon style={{ fontSize: 20 }} />{" "}
        </button>

        <h2 className=" text-stone-700 text-xl font-extrabold py-2 px-2 ml-7">
          {title}
        </h2>

        <p className=" text-stone-700 font-normal text-xs ml-8 mr-8 py-1 px-1">
          {subTitle1}
        </p>
      </div>
    </div>
  );
}

export default Teste;
