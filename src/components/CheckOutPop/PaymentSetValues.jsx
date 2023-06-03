import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";

const PaymentSetValues = ({
  setPaypalShow,
  setCashAppShow,
  setGrouponShow,
  setVenmoShow,
  setApplePayShow,
  setSquareShow,
  paypalShow,
  CashAppShow,
  GrouponShow,
  VenmoShow,
  ApplePayShow,
  SquareShow,
  setPaypal,
  setCashApp,
  setGroupon,
  setVenmo,
  setApplePay,
  setSquare,
  Paypal,
  CashApp,
  Groupon,
  Venmo,
  ApplePay,
  Square,
}) => {
  return (
    <div>
      <div
        className={
          paypalShow
            ? "d-none"
            : "d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom"
        }
      >
        <h2 className="fs-6  || d-flex || align-items-center  text-mainControl || fw-normal">
          <span
            onClick={() => {
              setPaypal(0);
              setPaypalShow(true);
            }}
            className="d-flex || px-2 || py-2 || cursor-pointer"
          >
            <AiFillDelete />
          </span>
          <span>Paypal</span>
        </h2>
        <h2 className="fs-6 || d-flex || align-items-center text-mainControl || fw-normal || fs-7">
          <span>
            <input
              type="text"
              className=""
              onFocus={(e) => {
                e.target.value = "";
              }}
              value={Paypal}
              onChange={(e) => {
                setPaypal(e.target.value);
              }}
              id="Paypal"
            />
          </span>
          <label
            htmlFor="Paypal"
            className="d-flex || px-2 || py-2 || cursor-pointer text-mainControl"
          >
            <HiOutlinePencil />
          </label>
        </h2>
      </div>
      <div
        className={
          CashAppShow
            ? "d-none"
            : "d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom"
        }
      >
        <h2 className="fs-6 || d-flex || align-items-center text-mainControl || fw-normal">
          <span
            onClick={() => {
              setCashApp(0);
              setCashAppShow(true);
            }}
            className="d-flex || px-2 || py-2 || cursor-pointer"
          >
            <AiFillDelete />
          </span>
          <span>Cash app</span>
        </h2>
        <h2 className="fs-6 || d-flex || align-items-center  text-mainControl || fw-normal || fs-7">
          <span>
            <input
              type="text"
              className=""
              value={CashApp}
              onFocus={(e) => {
                e.target.value = "";
              }}
              onChange={(e) => {
                setCashApp(e.target.value);
              }}
              id="Cashapp"
            />
          </span>
          <label
            htmlFor="Cashapp"
            className="d-flex || px-2 || py-2 || cursor-pointer text-mainControl"
          >
            <HiOutlinePencil />
          </label>
        </h2>
      </div>
      <div
        className={
          GrouponShow
            ? "d-none"
            : "d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom || "
        }
      >
        <h2 className="fs-6 || d-flex || align-items-center text-mainControl || fw-normal">
          <span
            onClick={() => {
              setGroupon(0);
              setGrouponShow(true);
            }}
            className="d-flex || px-2 || py-2 || cursor-pointer"
          >
            <AiFillDelete />
          </span>
          <span>Groupon</span>
        </h2>
        <h2 className="fs-6 || d-flex || align-items-center  text-mainControl || fw-normal || fs-7">
          <span>
            <input
              type="text"
              className=""
              value={Groupon}
              onFocus={(e) => {
                e.target.value = "";
              }}
              onChange={(e) => {
                setGroupon(e.target.value);
              }}
              id="Groupon"
            />
          </span>
          <label
            htmlFor="Groupon"
            className="d-flex || px-2 || py-2 || cursor-pointer text-mainControl"
          >
            <HiOutlinePencil />
          </label>
        </h2>
      </div>
      <div
        className={
          VenmoShow
            ? "d-none"
            : "d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom || "
        }
      >
        <h2 className="fs-6 || d-flex || align-items-center text-mainControl || fw-normal">
          <span
            onClick={() => {
              setVenmo(0);
              setVenmoShow(true);
            }}
            className="d-flex || px-2 || py-2 || cursor-pointer"
          >
            <AiFillDelete />
          </span>
          <span>Venmo</span>
        </h2>
        <h2 className="fs-6 || d-flex || align-items-center  text-mainControl || fw-normal || fs-7">
          <span>
            <input
              type="text"
              className=""
              value={Venmo}
              onFocus={(e) => {
                e.target.value = "";
              }}
              onChange={(e) => {
                setVenmo(e.target.value);
              }}
              id="Venmo"
            />
          </span>
          <label
            htmlFor="Venmo"
            className="d-flex || px-2 || py-2 || cursor-pointer text-mainControl"
          >
            <HiOutlinePencil />
          </label>
        </h2>
      </div>
      <div
        className={
          ApplePayShow
            ? "d-none"
            : "d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom "
        }
      >
        <h2 className="fs-6 || d-flex || align-items-center text-mainControl || fw-normal">
          <span
            onClick={() => {
              setApplePay(0);
              setApplePayShow(true);
            }}
            className="d-flex || px-2 || py-2 || cursor-pointer"
          >
            <AiFillDelete />
          </span>
          <span>Apple Pay</span>
        </h2>
        <h2 className="fs-6 || d-flex || align-items-center  text-mainControl || fw-normal || fs-7">
          <span>
            <input
              type="text"
              className=""
              value={ApplePay}
              onFocus={(e) => {
                e.target.value = "";
              }}
              onChange={(e) => {
                setApplePay(e.target.value);
              }}
              id="ApplePay"
            />
          </span>
          <label
            htmlFor="ApplePay"
            className="d-flex || px-2 || py-2 || cursor-pointer text-mainControl"
          >
            <HiOutlinePencil />
          </label>
        </h2>
      </div>
      <div
        className={
          SquareShow
            ? "d-none"
            : "d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom || border-bottom-0 "
        }
      >
        <h2 className="fs-6 || d-flex || align-items-center text-mainControl || fw-normal">
          <span
            onClick={() => {
              setSquare(0);
              setSquareShow(true);
            }}
            className="d-flex || px-2 || py-2 || cursor-pointer"
          >
            <AiFillDelete />
          </span>
          <span>Square</span>
        </h2>
        <h2 className="fs-6 || d-flex || align-items-center  text-mainControl || fw-normal || fs-7">
          <span>
            <input
              type="text"
              className=""
              value={Square}
              onFocus={(e) => {
                e.target.value = "";
              }}
              onChange={(e) => {
                setSquare(e.target.value);
              }}
              id="Square"
            />
          </span>
          <label
            htmlFor="Square"
            className="d-flex || px-2 || py-2 || cursor-pointer text-mainControl"
          >
            <HiOutlinePencil />
          </label>
        </h2>
      </div>
    </div>
  );
};

export default PaymentSetValues;
