import React, { useEffect, useRef, useState } from "react";
import logo from "../../images/LoginImage/logo-POS.png";
import {
  AiFillAlipayCircle,
  AiFillAliwangwang,
  AiFillAmazonSquare,
  AiFillAppstore,
  AiOutlineArrowLeft,
  AiOutlineSearch,
} from "react-icons/ai";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PrintTaket from "../../components/Taket/PrintTaket/PrintTaket";
import "../../components/Taket/Taket.css";
import BodyOfBuy from "../../components/BuyComponents/BodyOfBuy";
export default function Buy({ num, setNum, setOpenPages }) {
  const postiveControl = useRef();
  const dropDownIcon = useRef();
  const [dropDown, setDropDown] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [dark, setDark] = useState(false);
  const popUp = useRef();
  const navigate = useNavigate();
  const { id } = useParams()
  const userName = JSON.parse(localStorage.getItem("username"));

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
  useEffect(() => {
    function handleClickOutside(event) {
      if (popUp.current && !popUp.current.contains(event.target) && !document.querySelector(".Toastify").contains(event.target)) {
        setOpenPopUp(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popUp]);
  const closePop = () => {
    setOpenPopUp(false);
  };
  const handleBackToPage = () => {
    navigate("/");
  };
  return (
    <div className="">
      <div
        className={` ${openPopUp ? `visable ` : "unvisable"} 
        } transition CheckOutPop unselectable taket cursor-pointer `}
      >
        <div ref={popUp} className={`popUpChild scrollStylePopUp cursor-auto`}>
          <div className="position-relative h-100">
            <span className={`fs-2  span`}>
              <span className="empty"></span>
              <span className="headPop  || w-100 || text-center"></span>
              <div className="iconPop" onClick={closePop}>
                <IoMdClose />
              </div>
            </span>
            <div className="ps-4 pe-2 me-2 py-2 my-2 hPopUp scrollStyle overflow-auto">
              <div className="d-flex || pb-2 || align-items-center || justify-content-between">
                <div className="logoTicket">
                  <img
                    src="../img/HomeImg/logoSmall.png"
                    alt="logoSmall"
                    className=""
                  />
                </div>
                <h2 className="text-uppercase || mb-0 || per">Purchase</h2>
              </div>
              <div className="taketborder || p-3 ">
                <div className="d-flex || justify-content-between || scrollStyle  || infoTaket  || overflow-auto">
                  <div className="w-500">
                    <h2 className="text-capitalize || mb-0 || colorDarkWithe">
                      My Phillie Wireless
                    </h2>
                    <span className="d-block || colorOpi || mt-2 || fw-bold">
                      2701 N Broad Street
                    </span>
                    <span className="d-block || colorOpi || mt-2 || fw-bold">
                      <span>Philadelphia,</span>
                      <span className="ps-2">19121</span>
                    </span>
                    <span className="d-block || colorOpi || mt-2 || fw-bold">
                      270154156
                    </span>
                    <h2 className="text-uppercase || mt-4 || fs-3 || fw-normal || mb-0 || colorDarkWithe">
                      Vendor Information
                    </h2>
                    <span className="d-block || colorDarkWithe || fs-4 || ps-3 || mt-2 || fw-light">
                      Customer
                    </span>
                  </div>
                  <div className="w-300">
                    <span className="mb-0 || colorDarkWithe || d-flex || gap-3">
                      <span className="text-uppercase">Store ID </span>
                      <span className="fw-light">CSP4925</span>
                    </span>
                    <span className="mb-0 || mt-2 || colorDarkWithe || d-flex || gap-3">
                      <span className="text-uppercase">Register ID </span>
                      <span className="fw-light">Desktop-k26565</span>
                    </span>
                    <span className="mb-0 || mt-2 || colorDarkWithe || d-flex || gap-3">
                      <span className="text-uppercase">Date </span>
                      <span className="fw-light">1/13/23 8:51AM</span>
                    </span>
                    <span className="mb-0 || mt-2 || colorDarkWithe || d-flex || gap-3">
                      <span className="text-uppercase">Purchase ID </span>
                      <span className="fw-light">11071</span>
                    </span>
                    <span className="mb-0 || mt-2 || colorDarkWithe || d-flex || gap-3">
                      <span className="text-uppercase">Ref no </span>
                    </span>
                    <span className="mb-0 || mt-2 || colorDarkWithe || d-flex || gap-3">
                      <span className="text-uppercase">Rep name </span>
                      <span className="fw-light">admin</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="active  transactionsTable  tableProduct tableProductControl table-responsive  px-3 scrollStyle || d-block">
                <table className="table table-responsive">
                  <thead>
                    <tr>
                      <th colSpan="1">
                        <h5 className="pb-3 text-uppercase">Qunantity</h5>
                      </th>
                      <th colSpan="3">
                        <h5 className="pb-3 text-uppercase">Item name</h5>
                      </th>
                      <th colSpan="1">
                        <h5 className="pb-3 text-uppercase">imei</h5>
                      </th>
                      <th colSpan="2">
                        <h5 className="pb-3 text-uppercase">Unit price</h5>
                      </th>
                      <th colSpan="2">
                        <h5 className="pb-3 text-uppercase || border-end-0">
                          ext Amount
                        </h5>
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" containTable tableMain">
                    <tr>
                      <th colSpan="1">
                        <div className="d-flex  || align-items-center | justify-content-center || gap-2 || hightTable">
                          <span className="mb-0  controlWidthProduct  ">1</span>
                        </div>
                      </th>

                      <th colSpan="2">
                        <div className="d-flex  || align-items-center | justify-content-center || gap-2 || hightTable">
                          <span className="mb-0  controlWidthProduct  ">
                            iphone{" "}
                          </span>
                        </div>
                      </th>
                      <th colSpan="2">
                        <div className="d-flex  || align-items-center | justify-content-center || gap-2 || hightTable">
                          <span className="mb-0  controlWidthProduct  ">
                            35353535352
                          </span>
                        </div>
                      </th>
                      <th colSpan="2">
                        <div className="d-flex  || align-items-center | justify-content-center || gap-2 || hightTable">
                          <span className="mb-0  controlWidthProduct  ">
                            $200.00
                          </span>
                        </div>
                      </th>
                      <th colSpan="2">
                        <div className="d-flex  || align-items-center | justify-content-center || gap-2 || hightTable || border-end-0">
                          <span className="mb-0  controlWidthProduct  ">
                            $200.00
                          </span>
                        </div>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="d-flex || mt-2 || flex-wrap">
                <h3 className="py-2 || bgTact">
                  <div className="w-Q">1</div>
                </h3>
                <h3 className="py-2 || bgTact">
                  <div className="w-Q new">1 Items(s)</div>
                </h3>
              </div>
              <div className="d-flex  || flex-wrap  || justify-content-end || colorDarkWithe">
                <h4 className="w-Purchase || mb-0 || p-2 || border-Purchase">
                  Purchase Amount
                </h4>
                <span className="w-Purchase || d-flex || align-items-center || justify-content-end || border-start-0 || px-2  || border-Purchase || py-2">
                  $200.00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="position-absolute  opacity-0 unvisable PrintTaketV">
        <PrintTaket />
      </div>
      <div className="CheckOut  || text-center || unselectable ">
        <span
          onClick={handleBackToPage}
          className="fs-2 cursor-pointer handleBackToPage"
        >
          <AiOutlineArrowLeft />
        </span>
        <div className="row g-0 flex-row-reverse flex-xl-row position-relative">
          <div className="col-6 || col-xl-4 || p-1  || CheckOutBox || text-start || justify-content-start || border-start-0 || hightDefault">
            {/* <SearchCustomer number={number} setNumber={setNumber} /> */}
            {/* <div class=""><h2 class="text-start || px-2 || fs-3 || mb-2 ">Customer</h2><div class=""><form><div class="inputStyle  || rounded-2 || d-flex || justify-content-between || align-items-center"><input type="text" placeholder="Search In Customer" class="w-100" value=""><button class="customerBtn px-2 py-0 || position-relative" type="submit"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg></button></div></form><div class="d-none "></div><ul class="list-group"></ul></div></div> */}
            <div className="CheckOutBoxRespn mx-auto">
              <h2 className="text-start || px-2 || fs-3 || mb-2 ">Vendor</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="inputStyle  || rounded-2 || d-flex || justify-content-between || align-items-center">
                  <input
                    type="text"
                    placeholder="Search In Vendor"
                    className="w-100"
                    onChange={(e) => { }}
                  />
                  <button
                    className="customerBtn px-2 py-0 || position-relative"
                    type="submit"
                  >
                    <AiOutlineSearch />
                  </button>
                  {/* Loading Logic */}
                  {/* {loading ? (
                <button
                  className="customerBtn px-2 py-0 || position-relative"
                  type="submit"
                >
                  <div className="opacity-0 unvisable || d-flex">
                    <AiOutlineSearch />
                  </div>
                  <div className="transtionEdit || d-flex">
                    <Spinner />
                  </div>
                </button>
              ) : (
                <button
                  className="customerBtn px-2 py-0 || position-relative"
                  type="submit"
                >
                  <AiOutlineSearch />
                </button>
              )} */}
                </div>
              </form>
            </div>
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
                  const newData = JSON.parse(
                    localStorage.getItem("pages")
                  ).filter((ele) => ele.type === "buy");
                  if (newData.length === 1 && newData[0].id === +id) {
                    toast.info("Only This Pages Found", { theme: "dark" });
                  } else {
                    if (JSON.parse(localStorage.getItem("pages"))) {
                      if (
                        JSON.parse(localStorage.getItem("pages")).length !== 0
                      ) {
                        setOpenPages(true);
                        setNum(num + 1);
                      }
                    }
                  }
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
            <div className="EditHight">
              <h2 className="fs-4">Buy</h2>
              <h2 className="fs-4">{userName}</h2>
            </div>
          </div>
        </div>
        <BodyOfBuy openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} />
      </div>
    </div>
  );
}
