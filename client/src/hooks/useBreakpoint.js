import React, { useState, useEffect } from "react";
import theme from "../theme";

export default function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState("desktop");

  const handleResize = () => {
    const mobile = theme.breakpoints.mobile.substring(
      0,
      theme.breakpoints.mobile.length - 2
    );
    if (window.innerWidth < mobile) {
      setBreakpoint("mobile");
    } else {
      setBreakpoint("tablet");
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => handleResize(), []);

  return { breakpoint };
}
