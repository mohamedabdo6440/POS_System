import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ControlHightReset from "../ControlHightReset/ControlHightReset";
import "./reset.css";
export default function Reset({
  total,
  productSelected,
  number,
  stopScroll,
  totalWithoutTax,
}) {
  const [Product, setProductInfo] = useState([]);
  const [Customer, setCustomerInfo] = useState([]);
  const { id } = useParams();
  const reset = useRef();

  const namePage = window.location.pathname.split("/").at(-2);
  const productInfo = localStorage.getItem(`${namePage}${id}productInfo`);
  const customerInfo = localStorage.getItem(`${namePage}${id}customer`);

  useEffect(() => {
    if (productInfo) {
      setProductInfo(JSON.parse(productInfo));
    }
    if (customerInfo) {
      setCustomerInfo(JSON.parse(customerInfo));
    }
  }, [customerInfo, productInfo, number]);

  return (
    <div className={`resetHight`}>
      <div
        ref={reset}
        className={`${stopScroll ? "" : "cilresetHight || overflow-auto"
          } text-start  || scrollStyle || reset || unselectable`}
      >
        <ControlHightReset reset={reset} />
        <div className="">
          <div className={` imgControlReset`}>
            <img src="../img/HomeImg/reset.png" className="" alt="" />
          </div>
          <h4 className="">My phillie wireless</h4>
          <div className="d-flex || align-items-center || justify-content-between || spaceControl">
            <h4>241 n broad steet</h4>
            <h4>2546548</h4>
          </div>
          <h4>Egypt, sr</h4>
          <h4>2546548</h4>
          <h4>Egypt</h4>
          <hr />
          <div className="d-flex || align-items-center || justify-content-between || spaceControl">
            <h6>Store ID</h6>
            <h6>2546548</h6>
          </div>
          <div className="d-flex || align-items-center || justify-content-between || spaceControl">
            <h6>Register ID</h6>
            <h6>2546548</h6>
          </div>
          <div className="d-flex || align-items-center || justify-content-between || spaceControl">
            <h6>Shift/Batch ID</h6>
            <h6>2546548</h6>
          </div>
          <h3 className="fs-1 text-center mt-1 my-2">Sale Receipt</h3>
          <div className="d-flex || align-items-center || justify-content-between || spaceControl">
            <h6>Tue, April 27, 2021</h6>
            <h6>05:47PM</h6>
          </div>
          <div className="d-flex || align-items-center || justify-content-between || spaceControl">
            <h6>Transaction #</h6>
            <h6>15648</h6>
          </div>
          <div className="d-flex || align-items-center || justify-content-between || spaceControl">
            <h6>Customer</h6>
            <div className="w-50">
              <h6>
                {Customer.length !== 0 && (
                  <>
                    {Customer[0].first_name} {Customer[0].last_name}
                  </>
                )}
              </h6>
              <hr />
            </div>
          </div>
          <div className="d-flex || align-items-center || justify-content-between || spaceControl">
            <h6>Original Transaction #</h6>
            <h6>15648</h6>
          </div>
          <div className="d-flex || align-items-center || justify-content-between || spaceControl">
            <h6>Phone Number</h6>
            <div className="w-50">
              <h6>{Customer.length !== 0 && Customer[0].phone}</h6>
              <hr />
            </div>
          </div>
          <div className="d-flex || align-items-center || justify-content-between || spaceControl">
            <h6>Customer Address</h6>
            <div className="w-50">
              <h6>1608 n 2nd st</h6>
              <hr />
            </div>
          </div>
          <div className=" table-responsive  px-3 scrollStyle resetTableHight">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th colSpan="1">
                    <h5 className="pt-3 pb-1">Qty</h5>
                  </th>
                  <th colSpan="3">
                    <h5 className="pt-3 pb-1">Items name</h5>
                  </th>
                  <th colSpan="2">
                    <h5 className="pt-3 pb-1">U/Price</h5>
                  </th>
                  <th colSpan="2">
                    <h5 className="pt-3 pb-1">disc</h5>
                  </th>
                  <th colSpan="2">
                    <h5 className="pt-3 pb-1">Total</h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Product &&
                  Product.length !== 0 &&
                  productSelected.map((select, i) => (
                    <tr key={i}>
                      <th colSpan="3">
                        <div className="d-flex || align-items-center || gap-2 || ">
                          <p className="mb-0 overLap controlWidthProduct ">
                            {i + 1}
                          </p>
                        </div>
                      </th>
                      <th colSpan="1">
                        <div className="d-flex || align-items-center || gap-2 || ">
                          <p className="mb-0  controlWidthProduct  ">
                            {select.str}
                          </p>
                        </div>
                        {/* <h4 className="|  || d-flex || align-items-center || justify-content-center overLap controlWidthProduct">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam sint corrupti blanditiis atque repellendus quaerat aspernatur consequuntur reiciendis, eligendi voluptate dicta unde veritatis accusantium numquam ullam corporis rem repudiandae doloremque.</h4> */}
                      </th>
                      <th colSpan="2">
                        <h4 className=" || align-items-center || justify-content-center ">
                          ${select.price.sell}
                        </h4>
                      </th>
                      <th colSpan="2">
                        {" "}
                        <h4 className="|  || border-end-0  || align-items-center || justify-content-center">
                          ${select.price.sell * select.num}
                        </h4>
                      </th>
                      <th colSpan="2">
                        {" "}
                        <h4 className="|  || border-end-0  || align-items-center || justify-content-center">
                          ${select.price.sell * select.num}
                        </h4>
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex || align-items-center mt-3 || justify-content-between || spaceControl">
            <h6 className="text-uppercase ">No Reffunds ****</h6>
            <div className="w-50">
              <hr />
              <div className="d-flex || px-2 || align-items-center || justify-content-between || spaceControl">
                <h6 className="fw-semibold">Item Count</h6>
                <h6>{productSelected.length}</h6>
              </div>
              <hr className="mt-3" />
              <div className="d-flex || px-3 || align-items-center || justify-content-between || spaceControl">
                <h6 className="fw-semibold">Sub Total</h6>
                <h6>${totalWithoutTax}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
