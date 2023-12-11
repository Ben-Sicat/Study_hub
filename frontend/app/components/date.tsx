import React, { useState, useEffect } from "react";
import { format } from "date-fns";

function DateComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = format(currentDate, "MM-dd-yyyy");

  return <div>{formattedDate}</div>;
}

export default DateComponent;
