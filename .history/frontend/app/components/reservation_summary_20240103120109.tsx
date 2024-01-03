import React from "react";
import Butt from "./button";
import IcoButt from "./iconed_button";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AddToHomeScreenIcon from "@mui/icons-material/AddToHomeScreen";
import Line from "./line";

type ResProps = {
  time?: string;
  price?: string;
};

function Reserv({ time, price }: ResProps) {
  const ResDetails = {
    time: time || "0",
    price: price || "0",
  };

  return (
    <div>
      <p className=" text-textcolor text-sm font-semibold py-2 px-2 ml-7 mt-3">
        Payment Method
      </p>

      <div className="flex text-xs ml-14 mt-2 justify-between">
        <div>
          <div className="flex font-bold space-x-2">
            <p>Time Reserved:</p>
            <p>{ResDetails.time}</p>
          </div>
        </div>
        <h4 className="mr-16 font-bold">&#8369; {ResDetails.price}</h4>
      </div>

      <Line></Line>

      <div className="flex justify-between">
        <p className=" text-textcolor text-sm font-semibold py-2 px-2 ml-7 mt-3">
          Subtotal Fee
        </p>
        <p className=" text-textcolor text-sm font-semibold py-2 px-2 mt-3 mr-10">
          &#8369; {ResDetails.price}
        </p>
      </div>

      <p className=" text-textcolor text-sm font-extrabold py-2 px-2 ml-7 mt-3">
        Payment method
      </p>

      <IcoButt
        Icon={
          <PaymentsOutlinedIcon
            className="mr-3"
            style={{ fontSize: 28, color: "#EDC2B5" }}
          />
        }
        title="Cash"
        marginRight="230px"
      ></IcoButt>

      <IcoButt
        Icon={
          <AccountBalanceOutlinedIcon
            className="mr-3"
            style={{ fontSize: 28, color: "#EDC2B5" }}
          />
        }
        title="GCash"
        marginRight="220px"
      ></IcoButt>
    </div>
  );
}

export default Reserv;
