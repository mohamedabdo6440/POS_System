import React, { useEffect, useRef, useState } from "react";
import logo from "../../images/LoginImage/logo-POS.png";
import {
  AiFillAlipayCircle,
  AiFillAliwangwang,
  AiFillAmazonSquare,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import SearchCustomer from "../../components/CheckOutComponent/CustomersComponent/SearchCustomer";
import SearchProduct from "../../components/CheckOutComponent/ProductsComponent/SearchProduct";
import { AiFillAppstore } from "react-icons/ai";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Checkout.css";
import { useParams } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
const Checkout = ({ handleBackToPage, setNum, setOpenPages, num }) => {
  const [dark, setDark] = useState(false);
  const [number, setNumber] = useState(0);
  const userName = JSON.parse(localStorage.getItem("username"));
  const [dropDown, setDropDown] = useState(false);
  const [spending, setSpending] = useState(0);
  const { PageType } = useParams();
  const dropDownIcon = useRef();
  const postiveControl = useRef();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("dark"))) {
      if (!JSON.parse(localStorage.getItem("dark")).dark) {
        setDark(true);
      }
    }
  }, []);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropDownIcon.current &&
        !dropDownIcon.current.contains(event.target) &&
        postiveControl.current &&
        !postiveControl.current.contains(event.target) &&
        !document.querySelector(".Toastify").contains(event.target)
      ) {
        setDropDown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownIcon]);


  return (
    <div className="CheckOut  || text-center || unselectable ">
      <span
        onClick={handleBackToPage}
        className="fs-2 cursor-pointer handleBackToPage"
      >
        <AiOutlineArrowLeft />
      </span>
      <div className="row g-0 flex-row-reverse flex-xl-row position-relative">
        <div className="col-6 || col-xl-4 || p-1  || CheckOutBox || text-start || justify-content-start || border-start-0 || hightDefault">
          <SearchCustomer number={number} setNumber={setNumber} />
        </div>
        <div className="col-6 || col-xl-5 || py-4 || controlBorderHome  || CheckOutBox || position-relative">
          <div
            className="position-absolute || postiveControl"
            ref={postiveControl}
            onClick={() => setDropDown(!dropDown)}
          >
            <IoIosArrowDown />
          </div>
          <div
            ref={dropDownIcon}
            className={`${dropDown ? `active` : ``
              } position-absolute || row || dropDownIcon`}
          >
            <div className="IconDrop">
              <AiFillAliwangwang />
            </div>
            <div className="IconDrop">
              <AiFillAlipayCircle />
            </div>
            <div className="IconDrop">
              <AiFillAmazonSquare />
            </div>
            <div
              className="IconDrop"
              onClick={() => {

                alert("CartsPage From DataBase")
              }}
            >
              <AiFillAppstore />
            </div>
          </div>
          <div className="logo  || mainLogo">
            <img
              src="../img/HomeImg/dark-logo-POS.png"
              className={`${dark ? `` : `d-none`}`}
              alt=""
            />
            <img src={logo} className={`${dark ? `d-none` : ``}`} alt="" />
          </div>
        </div>
        <div className="col-3 || py-3  || CheckOutBox || border-end-0 || d-none || d-xl-flex || gap-3">
          <div className="d-flex || justify-content-center || align-items-center || gap-2">
            <div className="fw-normal fs-6">
              Target : <span className="targetText"> ${spending}</span>
            </div>
            <div className="position-relative CircularProgressbarWithChildren">
              <CircularProgressbarWithChildren
                className=" relative"
                value={50}
                circleRatio={0.7}
                styles={{
                  trail: {
                    strokeLinecap: "butt",
                    transformOrigin: "center center",
                    transform: "rotate(-126deg)",
                  },
                  path: {
                    strokeLinecap: "butt",
                    transform: "rotate(-126deg)",
                    transformOrigin: "center center",
                    stroke: "#0ea5ec",
                  },
                  text: {
                    transformOrigin: "center center",
                    fill: "#0ea5ec",
                    top: "50%",
                  },
                  backgroundColor: "#3e98c7",
                }}
                strokeWidth={10}
              />
              <div className="CircularProgressbarText targetText">
                {spending * (100 / 100)}%
              </div>
            </div>
          </div>
          <div className="EditHight">
            <h2 className="fs-4">Checkout</h2>
            <h2 className="fs-4">{userName}</h2>
          </div>
        </div>
      </div>
      <SearchProduct number={number} />
    </div>
  );
};

export default Checkout;
