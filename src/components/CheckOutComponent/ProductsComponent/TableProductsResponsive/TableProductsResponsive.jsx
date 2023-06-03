import { useRef } from "react";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import ControlHightTableRes from "../../../ControlHightTableRes/ControlHightTableRes";
export default function TableProductsResponsive({
  productSelected,
  item_filter,
  handleMinus,
  handlePlus,
}) {
  const resReset = useRef();
  return (
    <div
      ref={resReset}
      className="container || unselectable || resTableHight scrollStyle || overflow-auto  || flex-column || mt-3 || py-2 || gap-3 || d-flex || d-xl-none"
    >
      <ControlHightTableRes resReset={resReset} />
      <div className="gap-3 || d-flex || flex-column">
        {productSelected.length !== 0 &&
          productSelected.map((productsSelected, i) => {
            return (
              <div key={i} className="tableProductResponseve">
                <div className="d-flex || align-items-center || justify-content-center || headerTableRes || gap-2">
                  <span
                    className="fs-2  span"
                    onClick={() => {
                      item_filter(productsSelected.id);
                    }}
                  >
                    <IoMdClose />
                  </span>
                  <span className="fs-2  span2">{productsSelected.id}</span>
                  <div className="w-50">
                    <p className="mb-0  controlWidthProduct max-w-100 || fw-bold">
                      {productsSelected.str}
                    </p>
                  </div>
                  <div className="img">
                    <img src={productsSelected.imageUrl} alt="" />
                  </div>
                </div>
                <div className="my-3 || d-flex || align-items-center || justify-content-center || gap-4">
                  <p className="mb-0 || fw-bold">Unit Price :</p>
                  <p className="mb-0">${productsSelected.price.sell}</p>
                </div>
                <div className="my-3 || d-flex || align-items-center || justify-content-center || gap-4">
                  <p className="mb-0">Quantity</p>
                  <span className="d-flex || align-items-center  px-3 btnColorNew || w-edit || gap-2 || justify-content-between  || py-2 || rounded-3">
                    <button
                      className={`${productsSelected.num <= 1 ? `unvisable` : `visable`
                        } transition bg-transparent`}
                      onClick={() => {
                        if (productsSelected.num > 1) {
                          handleMinus(productsSelected);
                        }
                      }}
                    >
                      <HiMinusSm />
                    </button>
                    <p className="mb-0">{productsSelected.num}</p>
                    <button
                      className="bg-transparent"
                      onClick={() => handlePlus(productsSelected)}
                    >
                      <HiPlusSm />
                    </button>
                  </span>
                </div>
                <div className="my-3  || d-flex || align-items-center || justify-content-center || gap-3">
                  <p className="mb-0 || fw-bold">Tax :</p>
                  <p className="mb-0">15</p>
                </div>
                <div className="my-3 || pb-4 || d-flex || align-items-center || justify-content-center || gap-3">
                  <p className="mb-0 || fw-bold">Cost :</p>
                  <p className="mb-0">
                    ${productsSelected.num * productsSelected.price.sell}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
