import React from "react";
import Ticket from "@/app/components/ticket/Ticket";
function Discounts() {
  return (
    <div>
      <section>
        <div className="text-xl mobile:font-bold text-center  mobile:mb-3">
          Available Discounts
        </div>

        <div>
          <Ticket />
        </div>
        <div className="mobile:mt-6 text-center mobile:mb-11">
          {/* Gawing button */}
          <div>Sign In</div>
          <div className="text-8 color text-parrot-pink font-normal underline">
            Back to the top
          </div>
        </div>
      </section>
    </div>
  );
}

export default Discounts;
