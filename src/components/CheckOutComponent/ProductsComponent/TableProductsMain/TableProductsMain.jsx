import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { DELETE_ITEM } from "../../../EndPointsLinks";
import { Spinner } from "react-bootstrap";
import logo from "../../../../images/LoginImage/android-chrome-512x512.png";
export default function TableProductsMain({
  tableScroll,
  scroll,
  productSelected,
  handleMinus,
  handlePlus,
  ItemsSelect,
  setNumber,
  number,
  setDeleteLoading,
  DeleteLoading,
}) {
  return (
    <tbody
      className={`${scroll ? `scrollStyle` : ``} containTable tableMain`}
      ref={tableScroll}
    >
      {ItemsSelect &&
        ItemsSelect.map((productsSelected, i) => {
          return (
            <tr key={i}>
              <th colSpan="1">
                <div className="d-flex  || align-items-center | justify-content-center || gap-2 || hightTable">
                  <p className="mb-0  controlWidthProduct ">
                    {productsSelected.deviceInfo.id}
                  </p>
                </div>
              </th>
              <th colSpan="3">
                <div className="d-flex  || align-items-center || gap-2 || hightTable">
                  <div className="img">
                    {productsSelected.deviceInfo.imageUrl ? (
                      <img src={productsSelected.deviceInfo.imageUrl} alt="" />
                    ) : (
                      <img src={logo} alt="" />
                    )}
                  </div>
                  <p className="mb-0  controlWidthProduct  ">
                    {productsSelected.deviceInfo.str}
                  </p>
                </div>
              </th>
              <th colSpan="1">
                <span className="d-flex || align-items-center || gap-2 || justify-content-between w-100 | hightTable">
                  <button
                    className={`${
                      productsSelected.deviceInfo.num <= 1
                        ? `unvisable`
                        : `visable`
                    } transition btnQuantity`}
                    onClick={() => {
                      if (productsSelected.deviceInfo.num > 1) {
                        handleMinus(productsSelected.deviceInfo);
                      }
                    }}
                  >
                    <HiMinusSm />
                  </button>

                  <p className="mb-0">1</p>
                  <button
                    className="btnQuantity"
                    onClick={() =>
                      handlePlus(productsSelected.deviceInfo.length + 1)
                    }
                  >
                    <HiPlusSm />
                  </button>
                </span>
              </th>
              <th colSpan="2">
                <h4 className="| hightTable || d-flex || align-items-center || justify-content-center">
                  $
                  {productsSelected.deviceInfo.price.sell
                    ? productsSelected.deviceInfo.price.sell
                    : "0.00"}
                </h4>
              </th>
              <th colSpan="2">
                <h4 className="| hightTable || d-flex || align-items-center || justify-content-center">
                  15
                </h4>
              </th>
              <th colSpan="2">
                {" "}
                <h4 className="| hightTable  || d-flex || align-items-center || justify-content-center">
                  {/* Tax Make IT in State */}$
                  {productsSelected.deviceInfo.price.sell
                    ? Math.round(
                        (productsSelected.deviceInfo.num *
                          productsSelected.deviceInfo.price.sell *
                          15) /
                          100 +
                          productsSelected.deviceInfo.num *
                            productsSelected.deviceInfo.price.sell
                      )
                    : "0.00"}
                </h4>
              </th>
              <th colSpan="2">
                <h4 className="| hightTable || border-end-0 || d-flex || align-items-center || justify-content-center">
                  {DeleteLoading ? (
                    <p className="fs-5  || d-flex || cursor-pointer || text-danger || mb-0">
                      <Spinner
                        variant="dark"
                        animation="border"
                        role="status"
                      ></Spinner>
                    </p>
                  ) : (
                    <p
                      onClick={() => {
                        DELETE_ITEM(
                          productsSelected.id,
                          number,
                          setNumber,
                          setDeleteLoading
                        );
                      }}
                      className="fs-5  || d-flex || cursor-pointer || text-danger || mb-0"
                    >
                      <IoMdClose />
                    </p>
                  )}
                </h4>
              </th>
            </tr>
          );
        })}
    </tbody>
  );
}
