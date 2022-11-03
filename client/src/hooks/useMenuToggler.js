import React, { useRef, useEffect, useState } from "react";

function useMenuToggler(ref) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    /*https://stackoverflow.com/questions/27900053/css-transition-with-visibility-not-working
    Alert if clicked on outside of element*/
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return [isOpen, setIsOpen];
}

export default useMenuToggler;
