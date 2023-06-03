import React from "react";
import PopUp from "../PopUp/PopUp";
import { ImCheckmark } from "react-icons/im";
import Pagination from "../CheckOutComponent/PaginationProduct/Pagination";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { GET_DATA } from "../../redux/store/CartDataSlice";
import { CARTS } from "../EndPointsLinks";

const SearchModelPopUp = ({
  openAddProductFilter,
  setopenAddProductFilter,
  ModelResult,
  setModel,
  tableEditNew,
  setNumber,
  number,
  setIssu,
  customerSelected,
  setItems, Cart
}) => {
  const dispatch = useDispatch();
  const { PageType } = useParams();
  const Customer_URL = customerSelected
    ? customerSelected.map((cust) => {
      return cust.url;
    })[0]
    : null;


  //this function for get all issues related for this model select
  const handleLinkIssu = (issuData) => {
    if (PageType === "repair") {
      if (!Cart.data) {
        axios
          .get(
            `https://pos-beta.onrender.com/api/device/models/${issuData.id}/repairs`
          )
          .then((res) => {
            if (res.data.length > 0) {
              setIssu({ model: issuData, issue: res.data });
              setopenAddProductFilter(false);
              setNumber(number + 1);

              axios
                .post(CARTS, {
                  customer: Customer_URL,
                  type: window.location.pathname.split("/").at(-2),
                  origin: "pos",
                })
                .then((res) => {
                  setItems(false)
                  dispatch(GET_DATA(res.data));
                });
            } else {
              toast.error("No ISSUE For This Model", {
                theme: "dark",
              });
            }
          })
          .catch((err) => {
            toast.error(err.message, {
              theme: "dark",
            });
          });
      } else {
        axios
          .get(
            `https://pos-beta.onrender.com/api/device/models/${issuData.id}/repairs`
          )
          .then((res) => {
            if (res.data.length > 0) {
              setIssu({ model: issuData, issue: res.data });
              setopenAddProductFilter(false);
              setNumber(number + 1);
              console.log("s");
            } else {
              toast.error("No ISSUE For This Model", {
                theme: "dark",
              });
            }
          })
          .catch((err) => {
            toast.error(err.message, {
              theme: "dark",
            });
          });
      }
    } else {
    }
  };

  return (
    <PopUp
      open={openAddProductFilter}
      setOpen={setopenAddProductFilter}
      headPop="Select Model"
    >
      <div className="tableProduct tableEditNew mt-2  table-responsive  px-3 scrollStyle ">
        <table className="table table-responsive tableMain tableMainSearch text-mainControl">
          <thead>
            <tr>
              <th colSpan="3">
                <h5 className="text-center ">Items name</h5>
              </th>
              <th className=" border-bottom-0" colSpan="2">
                <h5 className=" border-end-0 || text-center">Selection</h5>
              </th>
            </tr>
          </thead>
          <tbody className="scrollStyle || overflow-auto || containTable ">
            {ModelResult.results &&
              ModelResult.results.map((pro, i) => {
                return (
                  <tr className="productRow" key={i}>
                    <th colSpan="3">
                      <div className="d-flex position-relative ||  srtHover  || align-items-center || gap-2 || hightTable || position-relative || borderRightControl">
                        <div className="img position-relative">
                          {pro.imageUrl ? (
                            <img
                              src={pro.imageUrl}
                              className="opacity-00"
                              alt=""
                              onLoad={(e) => {
                                e.target.style.opacity = "1";
                              }}
                            />
                          ) : (
                            <img
                              src="./img/HomeImg/logoSmall.png"
                              alt=""
                              className="blur"
                            />
                          )}
                        </div>
                        <p className="mb-0  controlWidthProduct hoverControls">
                          {pro.str}
                        </p>
                      </div>
                    </th>

                    <th className="border-bottom-0 " colSpan="2">
                      <p
                        onClick={() => {
                          handleLinkIssu(pro);
                        }}
                        className="fs-5  || d-flex || justify-content-center || align-items-center || text-center  hightTable || border-end-0 || cursor-pointer  || text-success || mb-0"
                      >
                        <ImCheckmark />
                      </p>
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <Pagination
        tableEditNew={tableEditNew}
        setModel={setModel}
        next={ModelResult.next}
        previous={ModelResult.previous}
      />
    </PopUp>
  );
};

export default SearchModelPopUp;
