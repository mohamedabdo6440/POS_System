import React from "react";
import { HiOutlinePencil } from "react-icons/hi";

const PaymentValues = ({
  AllPrice,
  TAXamount,
  setTAXamount,
  PriceISSU,
  setPriceISSU,
  setDeposit,
  Deposit,
  Discount,
  setDiscount,
}) => {
  return (
    <div className="">
      <div
        className={
          "d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom || p-0  "
        }
      >
        <h2 className="fs-6 || mb-0 || d-flex || align-items-center text-mainControl || fw-normal || w-50 ">
          <span>Diagnosis Fee</span>
        </h2>
        <h2 className="fs-6 || d-flex || align-items-center || justify-content-end  text-mainControl || fw-normal || fs-7 || mb-0 || w-50  ">
          <span>
            <input
              type="text"
              placeholder="$0.00"
              className=""
              onFocus={(e) => {
                e.target.value = "";
              }}
              id=""
            />
          </span>
          <label
            htmlFor=""
            className="d-flex || px-2 || py-2 || cursor-pointer text-mainControl"
          >
            <HiOutlinePencil />
          </label>
        </h2>
      </div>
      <div
        className={
          "d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom || p-0  "
        }
      >
        <h2 className="fs-6 || mb-0 || d-flex || align-items-center text-mainControl || fw-normal || w-50 ">
          <span>Repair Price</span>
        </h2>
        <h2 className="fs-6 || d-flex || align-items-center || justify-content-end   text-mainControl || fw-normal || fs-7 || mb-0 || w-50  ">
          <span>
            <input
              readOnly
              type="text"
              placeholder="$0.00"
              className=""
              id=""
              value={PriceISSU ? PriceISSU.reduce(AllPrice, 0) : PriceISSU}
              onChange={(e) => {
                setPriceISSU(e.target.value);
              }}
            />
          </span>
          <label
            htmlFor=""
            className="d-flex || px-2 || py-2 || cursor-pointer text-mainControl"
          >
            <HiOutlinePencil />
          </label>
        </h2>
      </div>
      <div
        className={
          "d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom || p-0  "
        }
      >
        <h2 className="fs-6 || mb-0 || d-flex || align-items-center text-mainControl || fw-normal || w-50 ">
          <span>Discount</span>
        </h2>
        <h2 className="fs-6 || d-flex || align-items-center || justify-content-end  text-mainControl || fw-normal || fs-7 || mb-0 || w-50  ">
          <span>
            <input
              id=""
              type="text"
              placeholder="$0.00"
              className=""
              value={Discount}
              onChange={(e) => {
                setDiscount(e.target.value);
              }}
            />
          </span>
          <label
            htmlFor=""
            className="d-flex || px-2 || py-2 || cursor-pointer text-mainControl"
          >
            <HiOutlinePencil />
          </label>
        </h2>
      </div>
      <div
        className={
          "d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom || p-0  "
        }
      >
        <h2 className="fs-6 || mb-0 || d-flex || align-items-center text-mainControl || fw-normal || w-50 ">
          <span>Tax Amount</span>
        </h2>
        <h2 className="fs-6 || d-flex || align-items-center || justify-content-end  text-mainControl || fw-normal || fs-7 || mb-0 || w-50  ">
          <span>
            <input
              type="text"
              value={TAXamount}
              className=""
              id=""
              onChange={(e) => {
                setTAXamount(e.target.value);
              }}
            />
          </span>
          <label
            htmlFor=""
            className="d-flex || px-2 || py-2 || cursor-pointer text-mainControl"
          >
            <HiOutlinePencil />
          </label>
        </h2>
      </div>
      <div
        className={
          "d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom || p-0 || border-bottom-0  "
        }
      >
        <h2 className="fs-6 || mb-0 || d-flex || align-items-center text-mainControl || fw-normal">
          <span>Deposit</span>
        </h2>
        <h2 className="fs-6 || d-flex || align-items-center || justify-content-end ||  text-mainControl || fw-normal || fs-7 || mb-0">
          <span>
            <input
              id=""
              type="text"
              placeholder="$0.00"
              className=""
              value={Deposit}
              onChange={(e) => {
                setDeposit(e.target.value);
              }}
            />
          </span>
          <label
            htmlFor=""
            className="d-flex || px-2 || py-2 || cursor-pointer text-mainControl"
          >
            <HiOutlinePencil />
          </label>
        </h2>
      </div>
    </div>
  );
};

export default PaymentValues;
