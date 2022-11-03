import React, { useRef, useEffect, useState } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useMenuToggler(ref) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return [isOpen, setIsOpen];
}

export default useMenuToggler;
