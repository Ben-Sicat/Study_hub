import React, { useState, useEffect } from "react";
import { format } from "date-fns";

function TimeComponent() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = format(currentTime, "HH:mm");

  return <div>{formattedTime}</div>;
}

export default TimeComponent;
