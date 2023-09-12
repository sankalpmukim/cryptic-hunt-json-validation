import { useState, useEffect } from "react";

const useIsMobile = (breakpoint = 768): boolean => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]); // Only re-run effect if the breakpoint changes

  return isMobile;
};

export default useIsMobile;
