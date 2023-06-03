import React, { useEffect, useRef } from "react";
import "./popUp.css";
import { IoMdClose } from "react-icons/io";

export default function PopUp({ children, setOpen, open, setShow, headPop }) {
  const popUp = useRef();
  const popUpChild = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (popUp.current && !popUp.current.contains(event.target) &&  !document.querySelector(".Toastify").contains(event.target) &&  !document.querySelector(".Toastify").contains(event.target)) {
        setOpen(false);
        if (setShow) {
          setShow(true);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popUp, setOpen, setShow]);

  const closePop = () => {
    setOpen(false);
    if (setShow) {
      setShow(true);
    }
  };
  return (
    <div
      className={`${
        open.length !== 0 && !open ? "unvisable" : "visable"
      } transition popUp unselectable`}
    >
      <div
      ref={popUp}
        className={`popUpChild  scrollStylePopUp  `}
      >
        <div ref={popUpChild} className="position-relative h-100 ">
          <span className= {`fs-2  span`}>
            <span className="empty"></span>
            <span className="headPop  || w-100 || text-center">
              {headPop && headPop}
            </span>
            <div className="iconPop" onClick={closePop}>
              <IoMdClose />
            </div>
          </span>
          <div className="ps-4 pe-2 me-2 py-2 my-2 hPopUp scrollStyle overflow-auto d-flex flex-column justify-content-center">{children}</div>
        </div>
      </div>
    </div>
  );
}
