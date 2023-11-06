import React from "react";
import Butt from "./button";
import IcoButt from "./iconed_button";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AddToHomeScreenIcon from "@mui/icons-material/AddToHomeScreen";
import Line from "./line";

function Reserv() {
  return (
    <div>
      <p className=" text-textcolor text-sm font-semibold py-2 px-2 ml-7 mt-3">
        Reservation Summary
      </p>

      <div className="flex text-xs ml-14 mt-2 justify-between">
        <div>
          <div className="flex font-bold">
            <p>Time Reserved:</p>
            <p>5:30 PM</p>
          </div>
          <div className="flex space-x-1">
            <p className="font-bold">1x</p>
            <p>1 hour</p>
            <p>(Individual Seat)</p>
          </div>
        </div>
        <h4 className="mr-16">&#8369; 80.00</h4>
      </div>

      <Line></Line>

      <div className="flex justify-between">
        <p className=" text-textcolor text-sm font-semibold py-2 px-2 ml-7 mt-3">
          Subtotal Fee
        </p>
        <p className=" text-textcolor text-sm font-semibold py-2 px-2 mt-3 mr-10">
          &#8369; 80.00
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

      <IcoButt
        Icon={
          <AddToHomeScreenIcon
            className="mr-3"
            style={{ fontSize: 28, color: "#EDC2B5" }}
          />
        }
        title="Paymaya"
        marginRight="205px"
      ></IcoButt>

      <div className="mt-10"></div>

      <Butt title="Proceed Transaction" Bgcolor="#ECECEC" width="340px" />
    </div>
  );
}

export default Reserv;
