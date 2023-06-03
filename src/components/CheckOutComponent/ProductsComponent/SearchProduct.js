import React, { useEffect, useRef, useState } from "react";
import Reset from "../../../components/Reset/Reset";
import PopReset from "../../../components/PopReset/PopReset";
import ProductsTables from "./ProductsTables/ProductsTables";
import { useParams } from "react-router-dom";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ControlHightPage from "../../ControlHightPage/ControlHightPage";
const SearchProduct = ({ scroll, number }) => {
  const searchRef = useRef("");
  const row = useRef();
  const tableScroll = useRef();
  const [productSelected, setProductSelected] = useState([]);
  const [openReset, setOpenReset] = useState(false);
  const [resetAbsolute, setResetAbsolute] = useState(false);
  const [total, setTotal] = useState(0);
  const [renNum, setRenNum] = useState(0);
  const [totalWithoutTax, setTotalWithoutTax] = useState(0);
  const resReset = useRef();
  const { PageType } = useParams();
  const [spending, setSpending] = useState(0);
  const userName = localStorage.getItem("username");


  console.log(productSelected);


  useEffect(() => {
    let allTotal = 0;
    if (productSelected.length > 0) {
      productSelected.forEach((ele) => {
        allTotal +=
          (ele.num * ele.price.sell * 15) / 100 + ele.num * ele.price.sell;
      });
    }
    setTotal(Math.round(allTotal));
  }, [productSelected, productSelected.length, renNum]);
  useEffect(() => {
    if (productSelected.length > 0) {
      productSelected.forEach((ele) => {
        setTotalWithoutTax(ele.num * ele.price.sell);
      });
    }
  }, [productSelected, productSelected.length, renNum]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setResetAbsolute(false);
    });
  }, []);

  return (
    <div
      ref={row}
      className="row || g-0 || hightControlProduct || position-relative || soverflow-x  || unselectable"
    >
      <ControlHightPage row={row} />
      <div
        className="btnReset d-block || d-xl-none  unselectable"
        onClick={() => {
          setOpenReset(true);
        }}
      >
        Show Reset
      </div>
      <ProductsTables
        setRenNum={setRenNum}
        renNum={renNum}
        resReset={resReset}
        productSelected={productSelected}
        setProductSelected={setProductSelected}
        total={total}
        setResetAbsolute={setResetAbsolute}
        resetAbsolute={resetAbsolute}
        searchRef={searchRef}
        scroll={scroll}
        tableScroll={tableScroll}
        totalWithoutTax={totalWithoutTax}
      />
      <div
        className={`${resetAbsolute ? ` ` : `active `
          } col-3 || transformTransition || resetAbsolute  || d-none || d-xl-block  || borderProduct`}
      >
        <Reset
          total={total}
          productSelected={productSelected}
          number={number}
        />
      </div>
      <div className="d-block || d-xl-none  || borderProduct">
        <PopReset headPop="Reset" open={openReset} setOpen={setOpenReset}>
          <div className=" py-4 || fs-4 || mb-3  || CheckOutBox || border-start-0 || border-end-0 || d-flex || d-xl-none">
            <div className="">
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
              <h2>Checkout</h2>
              <h2>{userName}</h2>
            </div>
          </div>

          <Reset
            stopScroll={true}
            productSelected={productSelected}
            total={total}
            number={number}
            totalWithoutTax={totalWithoutTax}
          />
        </PopReset>
      </div>
    </div>
  );
};

export default SearchProduct;
