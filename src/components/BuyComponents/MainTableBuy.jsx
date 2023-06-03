import React, { useRef } from "react";
import TableProductsMain from "../CheckOutComponent/ProductsComponent/TableProductsMain/TableProductsMain";
import ControlHightBodyTable from "../ControlHightBodyTable/ControlHightBodyTable";

export default function MainTableBuy({
  productSelected,
  handleDeleteProduct,
  handlePlus,
  handleMinus,
  setNumber,
  number,
  ItemsSelect,
  setDeleteLoading
}) {
  const tableProductControl = useRef();

  return (
    <div
      ref={tableProductControl}
      className="tableProduct tableProductControl table-responsive  px-3 scrollStyle || d-none || d-xl-block me-4"
    >
      <ControlHightBodyTable tableProductControl={tableProductControl} />
      <table className="table table-responsive">
        <thead>
          <tr>
            <th colSpan="1">
              <h5 className="pb-3">Items Code</h5>
            </th>
            <th colSpan="3">
              <h5 className="pb-3">Items name</h5>
            </th>
            <th colSpan="1">
              <h5 className="pb-3">Quantity</h5>
            </th>
            <th colSpan="2">
              <h5 className="pb-3">Unit Price</h5>
            </th>
            <th colSpan="2">
              <h5 className="pb-3">Tax</h5>
            </th>
            <th colSpan="2">
              <h5 className="pb-3">Cost</h5>
            </th>
            <th colSpan="2">
              <h5 className="pb-3 border-end-0">Delete</h5>
            </th>
          </tr>
        </thead>

        <TableProductsMain
          productSelected={productSelected}
          handleMinus={handleMinus}
          handlePlus={handlePlus}
          handleDeleteProduct={handleDeleteProduct}
          setNumber={setNumber}
          number={number}
          ItemsSelect={ItemsSelect}
          setDeleteLoading={setDeleteLoading}
        />
      </table>
    </div>
  );
}
