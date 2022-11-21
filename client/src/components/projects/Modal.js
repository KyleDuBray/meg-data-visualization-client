import React, { useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Modal = ({ children, isOpen, handleClose }) => {
  if (!isOpen) return null;
  return createPortal(
    <>
      <div className="fixed flex w-screen h-screen bg-black/50 z-50 top-0 right-0">
        <div className=" flex flex-col m-auto w-screen h-screen md:w-6/12 md:h-1/2 bg-white z-60 opacity-100">
          <button onClick={() => handleClose()}>
            <AiOutlineCloseCircle className="m-auto mr-5 mt-5 w-6 h-6" />
          </button>
          {children}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
