import React, { useEffect, useRef } from 'react'
import { IoMdClose } from "react-icons/io";
import "./PopReset.css"
export default function PopReset({children, setOpen, open}) {
  const popUp = useRef();
  const popUpChild = useRef();
  const closePop = ()=>{
    setOpen(false)
  }
  useEffect(() => {
    function handleClickOutside(event) {
      if (popUp.current && !popUp.current.contains(event.target) &&  !document.querySelector(".Toastify").contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popUp, setOpen]);
  return (
    <div
    className={`${open.length !== 0 && !open ? "unvisable" : "visable"
      } transition popUp unselectable`}
  >
    <div ref={popUp}  className={`popUpChild  scrollStylePopUp popUpChildReset`}>
    <span className="fs-2  span" >
          <span className="headPop  || w-100 || text-center">Reset</span>
            <div className="iconPop" onClick={closePop}>
            <IoMdClose />
            </div>
          </span>
      <div ref={popUpChild} className="ps-4 pe-2 me-2 py-2 my-2 hPopUp scrollStyle overflow-auto">
        {children}
      </div>
    </div>
  </div>
  )
}
