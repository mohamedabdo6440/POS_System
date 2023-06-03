import React, { useEffect, useState } from "react";
import PopUp from "../../PopUp/PopUp";
import { ImCheckmark } from "react-icons/im";
import "./IMEIPopUp.css";
import { AiOutlineSearch } from "react-icons/ai";
import IMEIProduct from "./IMEIProduct/IMEIProduct";
import { Spinner } from "react-bootstrap";
export default function IMEIPopUp({ closeAllPopUpAfterChecke, ID_CART_LOADING }) {


  const [openIMEI, setOpenIMEI] = useState(true);
  const [num, setNum] = useState(0);
  const fakeData = [1, 2, 3, 4, 5];
  const handelSelect = (e) => {
    setNum(num + 1);
    if (e.currentTarget.classList.contains("active")) {
      e.currentTarget.classList.remove("active");
      fakeData.forEach((ele, i) => {
        localStorage.removeItem("Pro" + i);
      });
    } else {
      e.currentTarget.classList.add("active");
      fakeData.forEach((ele, i) => {
        localStorage.setItem(
          "Pro" + i,
          JSON.stringify({
            select: true,
          })
        );
      });
    }
  };
  useEffect(() => {
    if (!openIMEI) {
      fakeData.forEach((ele, i) => {
        localStorage.removeItem("Pro" + i);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIMEI]);
  useEffect(() => {
    let selectAll = 0;
    fakeData.forEach((ele, i) => {
      if (JSON.parse(localStorage.getItem("Pro" + i))) {
        selectAll += 1;
      }
    });
    if (selectAll === fakeData.length) {
      document.querySelector(".selectBtn").classList.add("active");
    } else {
      document.querySelector(".selectBtn").classList.remove("active");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num]);
  return (
    <PopUp open={openIMEI} setOpen={setOpenIMEI} headPop="Select IMEI Number">
      <div className="unselectable ">
        <div className="inputStyle w-300px ms-0  me-auto inputStyle || fs-6  || rounded-2 || d-flex || justify-content-between || align-items-center">
          <input type="text" className="w-100" placeholder="IMEI Number" />
          <button className="customerBtn px-2 py-0" type="submit">
            <AiOutlineSearch />
          </button>
        </div>
        <div className="IMEI">
          <div className="d-block || d-md-flex || gap-3 || align-items-center">
            <span>Select IMEI Number</span>
            <div className="d-flex || justify-content-center || gap-2 || align-items-center">
              <div className="selectBtn" onClick={handelSelect}>
                <div className="selectBtnIcon">
                  <ImCheckmark />
                </div>
              </div>
              <span className="selectAll">Select All</span>
            </div>
          </div>
          <div className="items scrollStyle">
            {fakeData.map((ele, i) => (
              <IMEIProduct
                key={i}
                proNum={"Pro" + i}
                num={num}
                setNum={setNum}
              />
            ))}
          </div>
          <div className="d-flex || align-items-center || justify-content-center || gap-3 || mt-2">

            {
              ID_CART_LOADING ? (
                <button
                  onClick={closeAllPopUpAfterChecke}
                  className=" text-uppercase proceed"
                >
                  Save
                </button>
              ) : (
                <button className=" text-uppercase proceed">
                  <Spinner
                    variant="dark"
                    animation="border"
                    role="status"
                  >
                  </Spinner>
                </button>
              )
            }

            <button
              onClick={closeAllPopUpAfterChecke}
              className=" text-uppercase cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </PopUp>
  );
}
