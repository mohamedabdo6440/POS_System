import React from "react";
import { FaApplePay } from "react-icons/fa";

const PaymentMethods = ({
  setPaypalShow,
  setCashAppShow,
  setGrouponShow,
  setVenmoShow,
  setApplePayShow,
  setSquareShow,
}) => {
  return (
    <div className="d-flex || flex-warp || gap-2 || py-3 || px-3 || paymentMethod || align-items-center  || totalBotderBottom || border-0">
      <h2
        onClick={() => {
          setPaypalShow(false);
        }}
        className="fs-7 text-mainControl   || ps-2 || fw-normal  || py-3 || quickCash"
      >
        <span className="pay">
          <span>
            <FaApplePay />
          </span>
        </span>
        <span>Paypal</span>
      </h2>
      <h2
        onClick={() => {
          setCashAppShow(false);
        }}
        className="fs-7 text-mainControl   || ps-2 || fw-normal  || py-3 || quickCash"
      >
        <span className="pay">
          <span>
            <FaApplePay />
          </span>
        </span>
        <span>Cash app</span>
      </h2>
      <h2
        onClick={() => {
          setGrouponShow(false);
        }}
        className="fs-7 text-mainControl   || ps-2 || fw-normal  || py-3 || quickCash"
      >
        <span className="pay">
          <span>
            <FaApplePay />
          </span>
        </span>
        <span>Groupon</span>
      </h2>
      <h2
        onClick={() => {
          setVenmoShow(false);
        }}
        className="fs-7 text-mainControl   || ps-2 || fw-normal  || py-3 || quickCash"
      >
        <span className="pay">
          <span>
            <FaApplePay />
          </span>
        </span>
        <span>Venmo</span>
      </h2>
      <h2
        onClick={() => {
          setApplePayShow(false);
        }}
        className="fs-7 text-mainControl   || ps-2 || fw-normal  || py-3 || quickCash"
      >
        <span className="pay">
          <span>
            <FaApplePay />
          </span>
        </span>
        <span>Apple Pay</span>
      </h2>
      <h2
        onClick={() => {
          setSquareShow(false);
        }}
        className="fs-7 text-mainControl   || ps-2 || fw-normal  || py-3 || quickCash"
      >
        <span className="pay">
          <span>
            <FaApplePay />
          </span>
        </span>
        <span>Square</span>
      </h2>
    </div>
  );
};

export default PaymentMethods;
