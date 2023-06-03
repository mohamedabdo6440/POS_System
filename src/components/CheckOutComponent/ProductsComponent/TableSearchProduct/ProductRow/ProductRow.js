import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import IMEIPopUp from "../../../IMEIPopUp/IMEIPopUp";
import { AddItem } from "../../../../EndPointsLinks";
import logo from "../../../../../images/LoginImage/android-chrome-512x512.png";

const ProductRow = ({
  product,
  id,
  str,
  price,
  imageUrl,
  Mark,
  HandleProductSelected,
  setopenAddProductFilter,
  IMEINumber,
  number,
  setNumber,
  URL_Cart,
  ID_CART_LOADING,
}) => {
  const [IMEIPopUpOpen, setIMEIPopUpOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // this function use for item to cart close PopUp after checked IMEI Number
  const closeAllPopUpAfterChecke = () => {
    AddItem(URL_Cart, product.url, 1, number, setNumber);
    console.log("this function for addItem to sell");
    setIMEIPopUpOpen(!IMEIPopUpOpen);
    setopenAddProductFilter(false);
    setNumber(number + 1);
    setTimeout(() => {
      setNumber(number + 1);
      setTimeout(() => {
        setNumber(number + 2);
        setTimeout(() => {
          setNumber(number + 3);
        }, 100);
      }, 200);
    }, 300);
  };
  console.log(number);
  return (
    <tr className="productRow">
      <th colSpan="3">
        <div className="d-flex position-relative || hightTableFrist || srtHover  || align-items-center || gap-2 || hightTable || position-relative || borderRightControl">
          <h4 className="| hightTable    || border-end-0 || d-flex || align-items-center || justify-content-center d-block || d-xl-none || markControl || position-absolute">
            <p
              onClick={() => {
                setIMEIPopUpOpen(!IMEIPopUpOpen);
                HandleProductSelected(product);
              }}
              className="fs-5   || d-flex || cursor-pointer || text-success || mb-0"
            >
              {Mark}
            </p>
          </h4>
          <div className="img position-relative">
            {}
            {imageUrl && loading && (
              <div className="transtionEdit || d-flex">
                <Spinner />
              </div>
            )}
            {imageUrl ? (
              <img
                src={imageUrl}
                className="opacity-00"
                alt=""
                onLoad={(e) => {
                  setLoading(false);
                  e.target.style.opacity = "1";
                }}
              />
            ) : (
              <img src={logo} alt="" />
            )}
          </div>
          <p className="mb-0  controlWidthProduct hoverControls">{str}</p>
        </div>
      </th>

      <th colSpan="2">
        <h4 className="| hightTable || d-flex || align-items-center || justify-content-center ">
          ${price.sell}
        </h4>
      </th>

      <th className="|| d-none || d-xl-block  || border-bottom-0 " colSpan="2">
        <p
          onClick={() => {
            setIMEIPopUpOpen(!IMEIPopUpOpen);
            HandleProductSelected(product);
          }}
          className="fs-5  hightTable || border-end-0 || cursor-pointer  || text-success || mb-0"
        >
          {Mark}
        </p>
        {IMEIPopUpOpen && (
          <IMEIPopUp
            closeAllPopUpAfterChecke={closeAllPopUpAfterChecke}
            ID_CART_LOADING={ID_CART_LOADING}
          />
        )}
      </th>
    </tr>
  );
};

export default ProductRow;
