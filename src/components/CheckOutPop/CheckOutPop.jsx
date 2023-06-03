import React, { useEffect, useRef, useState } from "react";
import "./CheckOutPop.css";
import { IoMdClose } from "react-icons/io";
import { AiOutlineSearch, AiOutlineUser, AiFillDelete } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";
import { ImCheckmark } from "react-icons/im";
import CustomerInfo from "./CustomerInfo";
import PaymentMethods from "./PaymentMethodsShowing";
import PaymentSetValues from "./PaymentSetValues";
import { CREATE_ORDER } from "../EndPointsLinks"
export default function CheckOutPop({
  setOpen,
  open,
  headPop,
  total,
  productSelected,
  CartId,
}) {
  const [customerName, setCustomerName] = useState("");
  let [totalPrice, setTotalPrice] = useState(0);
  const [cash, setCash] = useState(0);
  const [Paypal, setPaypal] = useState(0);
  const [paypalShow, setPaypalShow] = useState(true);
  const [CashApp, setCashApp] = useState(0);
  const [CashAppShow, setCashAppShow] = useState(true);
  const [Groupon, setGroupon] = useState(0);
  const [GrouponShow, setGrouponShow] = useState(true);
  const [Venmo, setVenmo] = useState(0);
  const [VenmoShow, setVenmoShow] = useState(true);
  const [ApplePay, setApplePay] = useState(0);
  const [ApplePayShow, setApplePayShow] = useState(true);
  const [Square, setSquare] = useState(0);
  const [SquareShow, setSquareShow] = useState(true);
  const popUp = useRef();
  const popUpChild = useRef();
  const customer = JSON.parse(localStorage.getItem(`checkoutcustomer`));

  const changeCash =
    totalPrice - cash - Paypal - CashApp - Groupon - Venmo - ApplePay - Square;

  //this function to make clean and reset values in payment methods
  const handleCancelButton = () => {
    setCash(totalPrice);
    setPaypal(0);
    setCashApp(0);
    setGroupon(0);
    setVenmo(0);
    setApplePay(0);
    setSquare(0);
    // setOpen(false)
  };

  //this method for get chnged in total price after process
  useEffect(() => {
    total ? setTotalPrice(total) : setTotalPrice(0);
    setCash(totalPrice);
  }, [total, totalPrice]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popUp.current &&
        !popUp.current.contains(event.target) &&
        !document.querySelector(".Toastify").contains(event.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popUp, setOpen]);

  const closePop = () => {
    setOpen(false);
  };
  const handelSelect = (e) => {
    if (e.currentTarget.classList.contains("active")) {
      e.currentTarget.classList.remove("active");
    } else {
      e.currentTarget.classList.add("active");
    }
  };


  return (
    <div
      className={`${open.length !== 0 && !open ? "unvisable" : "visable"
        } transition CheckOutPop unselectable`}
    >
      <div ref={popUp} className={`popUpChild scrollStylePopUp `}>
        <div ref={popUpChild} className="position-relative h-100">
          <span className={`fs-2 span`}>
            <span className="empty"></span>
            <span className="headPop || w-100 || text-center">Reset</span>
            <div className="iconPop" onClick={closePop}>
              <IoMdClose />
            </div>
          </span>
          <div className="ps-4 pe-2 me-2 py-2 my-2 hPopUp scrollStyle overflow-auto">
            <div className="d-flex || flex-wrap || flex-md-nowrap || gap-3">
              <div className=" w-md-50 || w-100 || totalTax || justify-content-between">
                <div className="totalBg || py-2 || text-start || px-2 || d-flex || justify-content-between || align-items-center">
                  <span>Customer Information</span>
                  <div className="d-flex || justify-content-center || gap-2 || align-items-center">
                    <div className="selectBtn" onClick={handelSelect}>
                      <div className="selectBtnIcon">
                        <ImCheckmark />
                      </div>
                    </div>
                    <span className="selectAll">Email Receipt</span>
                  </div>
                </div>
                <div className="min-h-200">
                  <div className="d-flex || pe-2 || align-items-center || justify-content-between || gap-2 || totalBotderBottom">
                    <form className=" w-100 || my-2">
                      <h2 className="fs-7 || w-100 || text-mainControl || ps-2 || fw-normal">
                        <div className="inputStyle || w-100 || d-flex || align-items-center || py-1 || rounded-3 || px-3 || inputStyleDesign">
                          <div className="iconLoignColor || fs-5">
                            <AiOutlineUser />
                          </div>
                          <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="w-100"
                            readOnly
                            value={customerName}
                            onChange={(e) => {
                              setCustomerName(e.target.value);
                            }}
                          />
                          <span className=" px-2 py-0 || fs-5">
                            <AiOutlineSearch />
                          </span>
                        </div>
                      </h2>
                    </form>
                  </div>
                  {customer &&
                    customer.map((cust, i) => {
                      return (
                        <CustomerInfo
                          key={i}
                          phone={cust.phone}
                          points={cust.points}
                          email={cust.email}
                          fullName={cust.first_name + " " + cust.last_name}
                          spending={cust.spending}
                          bonus_count={cust.bonus_count}
                          birth_date={cust.birth_date}
                          setCustomerName={setCustomerName}
                        />
                      );
                    })}
                </div>
              </div>
              <div className="w-md-50 || w-100 || flex-column || d-flex">
                <div className="totalEdit || totalEditMd || position-relative || h-100 || d-flex || align-items-center || justify-content-center ">
                  <div className="d-flex || align-items-center || justify-content-center || gap-2  ">
                    <div className="">
                      <div className="text-mainControl || fs-3rem || d-flex || gap-1">
                        <h2>$ {totalPrice}</h2>
                      </div>
                    </div>
                  </div>
                  <h6 className="text-mainControl || mb-0 || fw-normal || position-absolute || top-0 || pt-2 || ps-3 || start-0">
                    Due Amount
                  </h6>
                  <h6 className="text-mainControl || mb-0 || fw-normal || position-absolute || bottom-0 || pb-2 || ps-3 || start-0">
                    {productSelected && productSelected.length} Items Sold
                  </h6>
                </div>
                <div className="bg-455c74 || py-2 || d-flex || justify-content-between || align-items-center || px-3">
                  <h6 className="text-mainControl || mb-0 || fw-normal">
                    Change
                  </h6>
                  <h6 className="text-mainControl || mb-0 || fw-normal">
                    ${changeCash}
                  </h6>
                  <button className="text-mainControl || mb-0 || fw-normal || py-1 ||  text-uppercase || rounded-0 || proceed">
                    Quote
                  </button>
                </div>
              </div>
            </div>
            <div className="d-flex || flex-wrap || flex-md-nowrap || gap-3 || mt-3">
              <div className="d-flex  || flex-column || w-md-50 || w-100 || totalTax || justify-content-between h-auto">
                <div className="totalBg || py-2  || text-start || px-2">
                  Quick Cash
                </div>
                <div>
                  <div className="py-2 || px-3 || gapQuickCash || align-items-center  || totalBotderBottom || border-0">
                    <h2
                      onClick={() => {
                        setCash(1);
                      }}
                      className="fs-7 text-mainControl ||  || ps-2 || fw-normal  || py-3 || quickCash"
                    >
                      $1
                    </h2>

                    <h2
                      onClick={() => {
                        setCash(20);
                      }}
                      className="fs-7 text-mainControl ||  || ps-2 || fw-normal  || py-3 || quickCash"
                    >
                      $20
                    </h2>
                    <h2
                      onClick={() => {
                        setCash(50);
                      }}
                      className="fs-7 text-mainControl ||  || ps-2 || fw-normal  || py-3 || quickCash"
                    >
                      $50
                    </h2>
                    <h2
                      onClick={() => {
                        setCash(100);
                      }}
                      className="fs-7 text-mainControl ||  || ps-2 || fw-normal  || py-3 || quickCash"
                    >
                      $100
                    </h2>
                    <h2
                      onClick={() => {
                        setCash(200);
                      }}
                      className="fs-7 text-mainControl ||  || ps-2 || fw-normal  || py-3 || quickCash"
                    >
                      $200
                    </h2>
                    <h2
                      onClick={() => {
                        setCash(300);
                      }}
                      className="fs-7 text-mainControl ||  || ps-2 || fw-normal  || py-3 || quickCash"
                    >
                      $300
                    </h2>
                    <h2
                      onClick={() => {
                        setCash(400);
                      }}
                      className="fs-7 text-mainControl ||  || ps-2 || fw-normal  || py-3 || quickCash"
                    >
                      $400
                    </h2>

                    <h2
                      onClick={() => {
                        setCash(600);
                      }}
                      className="fs-7 text-mainControl ||  || ps-2 || fw-normal  || py-3 || quickCash"
                    >
                      $600
                    </h2>

                    <h2
                      onClick={() => {
                        setCash(totalPrice);
                      }}
                      className="fs-7 text-mainControl ||  || ps-2 || fw-normal  || py-3 || quickCash"
                    >
                      ${totalPrice}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="w-md-50 || w-100 || totalTax || justify-content-between h-auto">
                <div className="totalBg || py-2 || text-start || px-2 || d-flex || justify-content-between || align-items-center">
                  <span>Payment</span>
                  <div className="d-flex || justify-content-center || gap-2 || align-items-center">
                    <div className="selectBtn " onClick={handelSelect}>
                      <div className="selectBtnIcon active">
                        <ImCheckmark />
                      </div>
                    </div>
                    <span className="selectAll">Print Receipt</span>
                  </div>
                </div>
                <div>
                  <div className="d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom">
                    <h2 className="fs-6 || py-2 || d-flex || align-items-center || gap-2  text-mainControl || ps-2 || fw-normal">
                      <span className="d-flex || cursor-pointer || unvisable">
                        <AiFillDelete />
                      </span>
                      <span>Cash</span>
                    </h2>{" "}
                    <h2 className="fs-6 || d-flex || align-items-center text-mainControl || fw-normal || fs-7">
                      <span>
                        <input
                          type="text"
                          className=""
                          value={cash}
                          onChange={(e) => {
                            setCash(e.target.value);
                          }}
                          id="cash"
                        />
                      </span>
                      <label
                        htmlFor="cash"
                        className="d-flex || px-2 || py-2 || cursor-pointer || text-mainControl
                        "
                      >
                        <HiOutlinePencil />
                      </label>
                    </h2>
                  </div>
                  <div>
                    <PaymentSetValues
                      setPaypalShow={setPaypalShow}
                      setCashAppShow={setCashAppShow}
                      setGrouponShow={setGrouponShow}
                      setVenmoShow={setVenmoShow}
                      setApplePayShow={setApplePayShow}
                      setSquareShow={setSquareShow}
                      paypalShow={paypalShow}
                      CashAppShow={CashAppShow}
                      GrouponShow={GrouponShow}
                      VenmoShow={VenmoShow}
                      ApplePayShow={ApplePayShow}
                      SquareShow={SquareShow}
                      setPaypal={setPaypal}
                      setCashApp={setCashApp}
                      setGroupon={setGroupon}
                      setVenmo={setVenmo}
                      setApplePay={setApplePay}
                      setSquare={setSquare}
                      Paypal={Paypal}
                      CashApp={CashApp}
                      Groupon={Groupon}
                      Venmo={Venmo}
                      ApplePay={ApplePay}
                      Square={Square}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row g-0">
              <div className="col-12 || col-xl-9 || mt-3 || totalTax || justify-content-between || h-auto">
                <div className="totalBg || py-2  || text-start || px-2">
                  Payment Method
                </div>
                <div>
                  <div>
                    <PaymentMethods
                      setPaypalShow={setPaypalShow}
                      setCashAppShow={setCashAppShow}
                      setGrouponShow={setGrouponShow}
                      setVenmoShow={setVenmoShow}
                      setApplePayShow={setApplePayShow}
                      setSquareShow={setSquareShow}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-3 || w-30 col-12 || col-xl-3 || d-flex || align-items-end || justify-content-center">
                <div className="d-flex || align-items-center || w-100 || justify-content-center || gap-3 text-center">
                  <button
                    onClick={() => {
                      CREATE_ORDER(CartId)
                      setOpen(false)

                    }}
                    className=" text-uppercase proceed">Save</button>
                  <button
                    onClick={handleCancelButton}
                    className=" text-uppercase cancel"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
