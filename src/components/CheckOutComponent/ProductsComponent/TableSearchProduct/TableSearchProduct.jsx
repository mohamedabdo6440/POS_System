import React, { useRef, useState } from "react";
import Pagination from "../../PaginationProduct/Pagination";
import { ImCheckmark } from "react-icons/im";
import PopUp from "../../../../components/PopUp/PopUp";
import AddProduct from "../AddProduct";
import ProductRow from "./ProductRow/ProductRow";


export default function TableSearchProduct({
  variantsResults,
  openAddProductFilter,
  setopenAddProductFilter,
  tableScroll,
  searchRef,
  scroll,
  HandleProductSelected,
  setVariantsResults,
  IMEINumber,
  setIMEINumber,
  number,
  setNumber,
  URL_Cart,
  ID_CART_LOADING,
}) {

  const tableRef = useRef("");
  const tableEditNew = useRef("");
  const [openAddProduct, setopenAddProduct] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleShowForm = () => {
    if (showForm) {
      setShowForm(false);
      searchRef.current.value = "";
    } else {
      setShowForm(true);
    }
  };

  return (
    <>
      {variantsResults ? (
        <div className="" ref={tableRef}>
          <PopUp
            open={openAddProductFilter}
            setOpen={setopenAddProductFilter}
            headPop="Add Product"
          >
            <div
              ref={tableEditNew}
              className="tableProduct tableEditNew mt-2  table-responsive  px-3 scrollStyle "
            >
              <table className="table table-responsive tableMain tableMainSearch">
                <thead>
                  <tr>
                    <th colSpan="3">
                      <h5 className="pb-3">Items name</h5>
                    </th>
                    <th colSpan="2">
                      <h5 className="pb-3 || borderRightNone">Unit Price</h5>
                    </th>
                    <th
                      className=" border-bottom-0  || d-none || d-xl-block"
                      colSpan="2"
                    >
                      <h5 className="pb-3 border-end-0">Selection</h5>
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={`${scroll ? `scrollStyle` : ``} containTable `}
                  ref={tableScroll}
                >
                  {variantsResults.results &&
                    variantsResults.results.map((pro, i) => {
                      return (
                        <ProductRow
                          key={i}
                          id={pro.id}
                          str={pro.str}
                          price={pro.price}
                          imageUrl={pro.imageUrl}
                          product={pro}
                          HandleProductSelected={HandleProductSelected}
                          IMEINumber={IMEINumber}
                          Mark={<ImCheckmark />}
                          setopenAddProductFilter={setopenAddProductFilter}
                          URL_Cart={URL_Cart}
                          number={number}
                          setNumber={setNumber}
                          ID_CART_LOADING={ID_CART_LOADING}
                        />
                      );
                    })}
                </tbody>
              </table>
            </div>
            <Pagination
              tableEditNew={tableEditNew}
              setVariantsResults={setVariantsResults}
              next={variantsResults.next}
              previous={variantsResults.previous}
            />
          </PopUp>
        </div>
      ) : (
        <PopUp
          open={openAddProduct}
          setOpen={setopenAddProduct}
          setShow={setShowForm}
          headPop="Create Product"
        >
          <div className="unselectable w-300px">
            <div className="text-secondary || fs-5">
              This Product Does Not Exist
            </div>
            <div className="">
              <button className="mt-3" onClick={handleShowForm}>
                Create Product
              </button>
            </div>
            <div className="">
              <AddProduct showForm={showForm} />
            </div>
          </div>
        </PopUp>
      )}
    </>
  );
}
