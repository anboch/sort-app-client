import { useEffect, useRef } from "react";

// todo edit any type
export const useOutsideClick = (callback: any) => {
  // todo edit any type
  const ref = useRef<any>();

  useEffect(() => {
    // todo edit any type
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [ref]);

  return ref;
};
